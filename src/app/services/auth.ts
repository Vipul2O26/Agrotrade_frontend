import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5142/api/Users'; 

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post('http://localhost:5142/api/Users/register', {
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
        localStorage.setItem('token', response.token);
        // Store user info as stringified JSON
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;

  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    if (!user) return null;

    try {
      return JSON.parse(user).role.toLowerCase();
    } catch {
      return null;
    }
  }
}
