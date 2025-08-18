import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { Users } from './admin/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5142/api/Users'; 

  constructor(private http: HttpClient, private router: Router, private user: Users) {}

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

  logout() {
    const user = this.getUser(); // from localStorage
    const userId = user?.userId;
    const username = user?.fullName;
  
    if (userId) {
      // Send logout info to backend
      this.http.post(`${this.apiUrl}/logout`, {
        userId: userId,
        username: username
      }).subscribe({
        next: () => console.log('Logout logged on server'),
        error: (err) => console.error('Failed to log logout:', err),
        complete: () => {
          this.clearSession();
          this.router.navigate(['/login']);
        }
      });
    } else {
     
      this.clearSession();
      this.router.navigate(['/login']);
    }
  }
  

  private clearSession() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getUser(): any {
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
