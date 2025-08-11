import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  clearSession() {
    this.clear();
    console.log('Session cleared');
  }
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('SessionService running in browser?', this.isBrowser);
  }

  // Keys (use lowercase consistently)
  private keys = {
    token: 'token',
    email: 'email',
    userId: 'userid',
    fullName: 'fullname',
    role: 'role',
    user: 'user'
  };

  setUserSession(user: { id: number; name: string; email: string; token: string; role: string }) {
    if (!this.isBrowser) return;
    try {
      sessionStorage.setItem(this.keys.userId, user.id.toString());
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
      localStorage.setItem(this.keys.userId, user.id.toString());
      localStorage.setItem(this.keys.fullName, user.name);
      localStorage.setItem(this.keys.email, user.email);
      localStorage.setItem(this.keys.token, user.token);
      localStorage.setItem(this.keys.role, user.role);
      localStorage.setItem(this.keys.user, JSON.stringify({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
    }
  }

  getUserSession() {
    if (!this.isBrowser) return null;
    const userJson = sessionStorage.getItem(this.keys.user) || localStorage.getItem(this.keys.user);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  clear(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
    localStorage.clear();
    console.log('Session and local storage cleared');
  }

  logout(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.keys.token);
    localStorage.removeItem(this.keys.token);
    console.log('Token removed from storage');
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

  // Example convenience methods
  getEmail(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.email) || localStorage.getItem(this.keys.email);
  }

  getUserId(): number | null {
    const idStr = sessionStorage.getItem(this.keys.userId) || localStorage.getItem(this.keys.userId);
    return idStr ? Number(idStr) : null;
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
