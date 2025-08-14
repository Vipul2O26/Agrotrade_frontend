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
  errorMessage: string | null = null;
  loading: any;

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
      role: ['Farmer', Validators.required], 
    });
  }


  onSubmit() {
    this.submitted = true;
    this.errorMessage = null; // Clear any previous server-side errors
  
    if (this.form.invalid) {
      return;
    }
  
    this.form.disable();
  
    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        this.form.enable();
        this.submitted = false; // Reset submitted state on success
  
        if (!res || !res.user || !res.token) {
          this.errorMessage = 'Invalid response from server. Please try again.';
          return;
        }
  
        const userData = res.user;
  
        this.sessionService.setUserSession({
          id: userData.userId,
          name: userData.fullName,
          email: userData.email,
          token: res.token,
          role: userData.role,
        });
  
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
        this.submitted = false; // Reset submitted state on error
        
        // Check for a specific 401 Unauthorized status
        if (err.status === 401) {
          this.errorMessage = 'Incorrect email or password.';
        } else {
          const serverMessage = err?.error?.message;
          if (serverMessage) {
            this.errorMessage = serverMessage;
          } else {
            // A more robust fallback for unexpected errors.
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      }
    });
  }
}
