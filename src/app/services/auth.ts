import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from './session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5142/api/Users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionservices: SessionService
  ) {}

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
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email: data.email,
      password: data.password,
      role: data.role,
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('expires_at', response.expiresAt);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
  
    return this.http.post<any>("http://localhost:5142/api/Users/refresh-token", {
      refreshToken: refreshToken
    }).pipe(
      tap((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("expiresAt", res.expiresAt);
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
        next: () => console.log('Logout stored in DB'),
        error: err => console.error('Error logging out:', err),
        complete: () => {
          this.sessionservices.clearSession();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.sessionservices.clearSession();
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
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
    return user ? user.role?.toLowerCase() : null;
  }

  
  
}

