import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionService , UserSession } from '../Session/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7066';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    // restore session on service init
    const savedSession = this.sessionService.getUserSession();
    if (savedSession) {
      this.loadCurrentUser().subscribe();
    }
  }

  /** 🔹 Login */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            const session: UserSession = {
              email: email,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              tokenType: response.tokenType
            };
            this.sessionService.setUserSession(session);

            // load extended info (id, roles, etc.)
            this.loadCurrentUser().subscribe();
          }
        })
      );
  }

  /** 🔹 Register */
  register(model: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register-extended`, model);
  }

  /** 🔹 Load user info from backend */
  loadCurrentUser(): Observable<any> {
    const token = this.sessionService.getToken();
    if (!token) {
      this.currentUserSubject.next(null);
      return new Observable();
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/manage/info-extended`, { headers })
      .pipe(
        tap(user => {
          // merge extended info into session
          const session = this.sessionService.getUserSession();
          if (session) {
            session.id = user.id;
            session.name = user.userName;
            session.roles = user.roles;
            this.sessionService.setUserSession(session);
          }
          this.currentUserSubject.next(user);
        })
      );
  }

  /** 🔹 Logout */
  logout() {
    this.sessionService.clearSession();
    this.currentUserSubject.next(null);
  }

  /** 🔹 Check login */
  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  /** 🔹 Get roles */
  getRoles(): string[] {
    return this.sessionService.getRoles();
  }
}
