import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isBrowser: boolean;

  private keys = {
    token: 'token',
    email: 'email',
    userId: 'userId',
    fullName: 'fullName',
    user: 'user',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('SessionService running in browser?', this.isBrowser);
  }

  // Set user session
  setUserSession(user: UserSession) {
    if (!this.isBrowser) return;

    try {
      const name = user.name || '';
      const token = user.token || '';

      sessionStorage.setItem(this.keys.userId, user.id);
      sessionStorage.setItem(this.keys.fullName, name);
      sessionStorage.setItem(this.keys.email, user.email);
      sessionStorage.setItem(this.keys.token, token);
      sessionStorage.setItem(
        this.keys.user,
        JSON.stringify({ userId: user.id, name, email: user.email })
      );

      console.log('User session stored successfully');
    } catch (err) {
      console.warn(
        'Failed to store session in sessionStorage, falling back to localStorage'
      );
      localStorage.setItem(this.keys.userId, user.id);
      localStorage.setItem(this.keys.fullName, user.name || '');
      localStorage.setItem(this.keys.email, user.email);
      localStorage.setItem(
        this.keys.user,
        JSON.stringify({ userId: user.id, name: user.name || '', email: user.email })
      );
    }
  }

  // Get full user session
  getUserSession(): UserSession | null {
    if (!this.isBrowser) return null;

    const userJson =
      sessionStorage.getItem(this.keys.user) || localStorage.getItem(this.keys.user);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (err) {
      console.error('Error parsing user session JSON:', err);
      return null;
    }
  }

  // Clear session
  clearSession(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
    localStorage.clear();
    console.log('Session and localStorage cleared');
  }

  // Token management
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

  // Convenience getters
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

  getName(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.fullName) || localStorage.getItem(this.keys.fullName);
  }
}
