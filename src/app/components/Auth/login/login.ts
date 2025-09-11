import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/Auth/auth-service';
import { SessionService } from '../../../services/Session/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule , RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
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
  
    this.authservice.login(this.form.value.email, this.form.value.password).subscribe({
      next: (res) => {
        alert("Login success ✅");
        console.log("User:", res);
  
        // Save session
        this.sessionService.setUserSession(res);
  
        // ✅ Redirect based on role
        if (res.roles && res.roles.includes("Admin")) {
          this.router.navigate(['/admindashboard']);
        } else if (res.roles && res.roles.includes("Farmer")) {
          this.router.navigate(['/farmerdashboard']);
        } else {
          this.router.navigate(['/']); 
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || "Invalid login!";
      }
    });
  }
  
}
