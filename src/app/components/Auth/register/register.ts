import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;

    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registration successful! Please log in.';
        this.registerForm.reset();
        this.submitted = false;

        // redirect after 2s
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed!';
        console.error('Registration error:', err);
      }
    });
  }
}
