import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/Auth/auth-service';
import { SessionService } from '../../../services/Session/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.form.invalid) return;

    this.loading = true;

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (res) => {
        // Save the token and basic user info
        this.sessionService.setUserSession({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          tokenType: res.tokenType,
          email: res.email,
          id: res.id,
          name: res.name
        });
    
        // Now fetch user roles
        this.authService.loadCurrentUser().subscribe({
          next: (user) => {
            const roles = user.roles || []; // fallback if undefined
    
            if (roles.includes('Admin')) {
              this.router.navigate(['/admindashboard']);
            } else if (roles.includes('Farmer')) {
              this.router.navigate(['/farmerdashboard']);
            } else {
              this.router.navigate(['/']); // fallback
            }
          },
          error: () => {
            this.router.navigate(['/']); // fallback if roles can't be fetched
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid login!';
      }
    });
  }
}
