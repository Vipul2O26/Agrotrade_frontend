import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

/**
 * Service to manage user session data in browser storage (sessionStorage first, then localStorage fallback).
 * Handles platform checks for SSR compatibility.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('SessionService running in browser?', this.isBrowser);
  }

  // Keys for storing data in browser storage (using lowercase consistently)
  private keys = {
    token: 'token',
    email: 'email',
    userId: 'userid', // Stored as a string (GUID)
    fullName: 'fullname',
    role: 'role',
    user: 'user' // Stores a JSON string of the user object
  };

  /**
   * Sets the user session data in sessionStorage, with localStorage as fallback.
   * Assumes user.id is a string (GUID).
   * @param user Object containing user details: id (GUID string), name, email, token, role.
   */
  setUserSession(user: { id: string; name: string; email: string; token: string; role: string }) {
    if (!this.isBrowser) return; // Exit if not in browser environment
    try {
      // Use sessionStorage first
      sessionStorage.setItem(this.keys.userId, user.id); // Store userId as string (GUID)
      sessionStorage.setItem(this.keys.fullName, user.name);
      sessionStorage.setItem(this.keys.email, user.email);
      sessionStorage.setItem(this.keys.token, user.token);
      sessionStorage.setItem(this.keys.role, user.role);
      sessionStorage.setItem(this.keys.user, JSON.stringify({
        userId: user.id, // Store userId as string (GUID) in the user object
        name: user.name,
        email: user.email,
        role: user.role
      }));
      console.log('User session stored in sessionStorage');
    } catch (err) {
      // Fallback to localStorage if sessionStorage fails (e.g., privacy mode)
      console.warn('Failed to store user session in sessionStorage, falling back to localStorage');
      localStorage.setItem(this.keys.userId, user.id);
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

  /**
   * Retrieves the full user session object.
   * Prioritizes sessionStorage, then localStorage.
   * @returns Parsed user object or null if not found/invalid.
   */
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

  /**
   * Clears all items related to the session from both sessionStorage and localStorage.
   */
  clearSession(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
    localStorage.clear();
    console.log('Session and local storage cleared');
  }

  /**
   * Removes only the authentication token from storage.
   */
  logout(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.keys.token);
    localStorage.removeItem(this.keys.token);
    console.log('Token removed from storage');
  }

  /**
   * Retrieves the authentication token.
   * @returns Token string or null.
   */
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.token) || localStorage.getItem(this.keys.token);
  }

  /**
   * Sets the authentication token in storage.
   * @param token The token string.
   */
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

  /**
   * Clears the authentication token from storage.
   */
  clearToken(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.keys.token);
    localStorage.removeItem(this.keys.token);
    console.log('Token cleared from storage');
  }

  /**
   * Checks if a user is currently logged in (based on token presence).
   * @returns True if a token exists, false otherwise.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Retrieves the user's email.
   * @returns Email string or null.
   */
  getEmail(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.email) || localStorage.getItem(this.keys.email);
  }

  /**
   * Retrieves the user's ID.
   * This now returns a string (GUID) or null.
   * @returns User ID as string (GUID) or null.
   */
  getUserID(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.userId) || localStorage.getItem(this.keys.userId);
  }

  /**
   * Retrieves the user's role.
   * @returns Role string or null.
   */
  getRole(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.role) || localStorage.getItem(this.keys.role);
  }

  /**
   * Retrieves the user's full name.
   * @returns Full name string or null.
   */
  getName(): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(this.keys.fullName) || localStorage.getItem(this.keys.fullName);
  }
}
