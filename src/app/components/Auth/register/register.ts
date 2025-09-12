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

  // convenience getter for easy form access in template
  get f() {
    return this.registerForm.controls;
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

    // Pass form value (email + password) to API
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = '✅ Registration successful! Please log in.';
        this.registerForm.reset();
        this.submitted = false;

        // redirect to login after short delay
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;

        if (err.error?.errors) {
          // collect identity errors (ex: "Password too short", "Email already taken")
          this.errorMessage = Object.values(err.error.errors)
            .flat()
            .join(', ');
        } else {
          this.errorMessage = err.error?.message || '❌ Registration failed!';
        }

        console.error('Registration error:', err);
      },
    });
  }
}
