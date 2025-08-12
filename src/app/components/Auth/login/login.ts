import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

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
      role: ['Farmer', Validators.required], // Default role
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: (res) => {
          const userData = res?.user; // Adjust based on your API response

          if (!userData) {
            alert('Invalid response from server');
            return;
          }

          // Store session
          this.sessionService.setUserSession({
            id: userData.userId,
            name: userData.fullName,
            email: userData.email,
            token: userData.token,
            role: userData.role
          });

          // Navigate based on role (case-insensitive)
          const role = (userData.role || '').toLowerCase();
          if (role === 'farmer') {
            this.router.navigate(['/farmer']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: () => alert('Invalid credentials')
      });
    }
  }
}
