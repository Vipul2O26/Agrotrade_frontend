import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('SessionService running in browser?', this.isBrowser);
  }


  private keys = {
    token: 'token',
    email: 'email',
    userId: 'userid', 
    fullName: 'fullname',
    role: 'role',
    user: 'user' 
  };


  setUserSession(user: { id: string; name: string; email: string; token: string; role: string }) {
    if (!this.isBrowser) return; 
    try {
  
      sessionStorage.setItem(this.keys.userId, user.id); 
      sessionStorage.setItem(this.keys.fullName, user.name);
      sessionStorage.setItem(this.keys.email, user.email);
      sessionStorage.setItem(this.keys.token, user.token);
      sessionStorage.setItem(this.keys.role, user.role);
      sessionStorage.setItem(this.keys.user, JSON.stringify({
        userId: user.id, 
        name: user.name,
        email: user.email,
        role: user.role
      }));
      console.log('User session stored in sessionStorage');
    } catch (err) {

      console.warn('Failed to store user session in sessionStorage, falling back to localStorage');
      localStorage.setItem(this.keys.userId, user.id);
      localStorage.setItem(this.keys.fullName, user.name);
      localStorage.setItem(this.keys.email, user.email);
      localStorage.setItem(this.keys.role, user.role);
      localStorage.setItem(this.keys.user, JSON.stringify({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
    }
  }


  getUserSession(): any | null {
    if (!this.isBrowser) return null;
    const userJson = sessionStorage.getItem(this.keys.user) || localStorage.getItem(this.keys.user);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Error parsing user session JSON from storage:', e);
      return null;
    }
  }


  clearSession(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
    localStorage.clear();
    console.log('Session and local storage cleared');
  }

 

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.token) || localStorage.getItem(this.keys.token);
  }


  setToken(token: string): void {
    if (!this.isBrowser) return;
    try {
      sessionStorage.setItem(this.keys.token, token);
      console.log('Token stored in sessionStorage');
    } catch {
      localStorage.setItem(this.keys.token, token);
      console.warn('Failed to store token in sessionStorage, stored in localStorage instead');
    }
  }

  clearToken(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.keys.token);
    localStorage.removeItem(this.keys.token);
    console.log('Token cleared from storage');
  }

 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  getEmail(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.email) || localStorage.getItem(this.keys.email);
  }


  getUserID(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.userId) || localStorage.getItem(this.keys.userId);
  }


  getRole(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.role) || localStorage.getItem(this.keys.role);
  }

 
  getName(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.fullName) || localStorage.getItem(this.keys.fullName);
  }

  
}
