import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private sessionService: SessionService // ✅ make it a property
  ) {}
  

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Farmer', Validators.required], 
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: (res) => {
          const userData = res.user; // Adjust based on actual response structure
          if (!userData) {
            alert('Invalid response from server');
            return;
          }
  
          const role = this.auth.getUserRole();
          this.sessionService.setUserSession({
            id: userData.userId,
            name: userData.fullName,
            email: userData.email,
            token: userData.token,
            role: userData.role
          });
  
          if (role === 'farmer') {
            this.router.navigate(['/farmer']);
          } else if (role === 'buyer') {
            this.router.navigate(['/buyer']);
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
