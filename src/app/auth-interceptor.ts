// src/app/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from './services/Session/session';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const userSession = sessionService.getUserSession();
  const authToken = userSession?.accessToken; // ✅ use accessToken

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
