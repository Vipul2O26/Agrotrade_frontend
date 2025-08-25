import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink , FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // ✅ role must be selected
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.form.disable();

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        this.form.enable();
        this.loading = false;
        this.submitted = false;

        if (!res || !res.user || !res.accessToken) {
          this.errorMessage = 'Invalid response from server. Please try again.';
          return;
        }

        const userData = res.user;

        this.sessionService.setUserSession({
          id: userData.userId,
          name: userData.fullName,
          email: userData.email,
          token: res.accessToken, // ✅ correct field
          role: userData.role,
        });

        // ✅ route based on role
        const role = (userData.role || '').toLowerCase();
        if (role === 'farmer') {
          this.router.navigate(['/farmer']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.form.enable();
        this.loading = false;
        this.submitted = false;

        if (err.status === 401) {
          this.errorMessage = 'Incorrect email or password.';
        } else {
          this.errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
