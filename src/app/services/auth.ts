import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from './session';

import { Users } from './admin/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5142/api/Users'; 

  constructor(private http: HttpClient, private router: Router, private user: Users, private sessionservices: SessionService) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, {
      Email: data.email,
      Password: data.password,
      FullName: data.name,
      Role: data.role,
      Address: data.address,
      PhoneNumber: data.phoneNumber  
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: data.email,
      password: data.password,
      role: data.role
    }).pipe(
      tap((response: any) => {
        // Save token and user in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logActivity(userId: string, action: string, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/LogActivity`, {
      userId,
      action,
      description,
      log: `${action} - ${description}`  
    });
  }

  logout(): void {
    const userId = this.sessionservices.getUserID();
    const fullName = this.sessionservices.getName();
  
    if (userId && fullName) {
      this.http.post(`${this.apiUrl}/logout`, { userId, fullName }).subscribe({
        next: () => {
          console.log('Logout stored in DB');
          this.sessionservices.clearSession();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error logging out:', err);
          // still clear session even if API fails
          this.sessionservices.clearSession();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.sessionservices.clearSession();
      this.router.navigate(['/login']);
    }
  }
  
  
  
  
  

  private clearSession() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getUser() {
    const user = localStorage.getItem('user'); 
    return user ? JSON.parse(user) : null;
  }
  getUserId(): string | null {
    const user = this.getUser();
    return user ? user.userId : null;
  }

  getUserName(): string | null {
    const user = this.getUser();
    return user ? user.fullName : null;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role.toLowerCase() : null;
  }
}
