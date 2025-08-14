import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

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
  errorMessage: string | null | undefined;
  successMessage: string | undefined;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null; // Clear previous errors
    this.loading = true;
    
  
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
  
    // Handle password mismatch on the client-side
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.errorMessage = 'Passwords do not match.';
      this.loading = false;
      return;
    }
  
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Registration successful! You can now log in.';
        this.registerForm.reset();
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        
        // Check for a specific 400 status code
        if (err.status === 400) {
          // The backend sends a simple string for a bad request
          const serverMessage = err.error; 
          if (typeof serverMessage === 'string') {
            // Pass the message from the backend directly to the user
            this.errorMessage = serverMessage; 
          } else {
            // Fallback if the 400 error is not a simple string
            this.errorMessage = 'Registration data is invalid. Please check your inputs.';
          }
        } else {
          // Fallback for all other error statuses (e.g., 500, network issues)
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        
        console.error('Registration error:', err);
      }
    });
  }
}

