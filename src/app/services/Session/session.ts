import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserSession {
  email: string;
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  id?: string;        // userId
  name?: string;      // username/fullname
  roles?: string[];   // ✅ user roles (Farmer/Admin)
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isBrowser: boolean;
  private storageKey = 'userSession';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('SessionService running in browser?', this.isBrowser);
  }

  // ✅ Save user session
  setUserSession(session: UserSession) {
    if (!this.isBrowser) return;

    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(session));
      console.log('User session stored successfully in sessionStorage');
    } catch (err) {
      console.warn('Falling back to localStorage', err);
      localStorage.setItem(this.storageKey, JSON.stringify(session));
    }
  }

  // ✅ Get full user session
  getUserSession(): UserSession | null {
    if (!this.isBrowser) return null;

    const sessionJson =
      sessionStorage.getItem(this.storageKey) || localStorage.getItem(this.storageKey);
    if (!sessionJson) return null;

    try {
      return JSON.parse(sessionJson) as UserSession;
    } catch (err) {
      console.error('Error parsing user session JSON:', err);
      return null;
    }
  }

  // ✅ Clear session
  clearSession(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageKey);
    console.log('Session cleared from storage');
  }

  // ✅ Convenience getters
  getToken(): string | null {
    return this.getUserSession()?.accessToken || null;
  }

  getRefreshToken(): string | null {
    return this.getUserSession()?.refreshToken || null;
  }

  getEmail(): string | null {
    return this.getUserSession()?.email || null;
  }

  getUserID(): string | null {
    return this.getUserSession()?.id || null;
  }

  getName(): string | null {
    return this.getUserSession()?.name || null;
  }

  getRoles(): string[] {
    return this.getUserSession()?.roles || [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
