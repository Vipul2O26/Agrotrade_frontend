import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../../Session/session';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  const isLoggedIn = sessionService.isLoggedIn();
  const allowedRoles = route.data['roles'] as string[] | undefined;
  const userRoles = sessionService.getRoles() || [];

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some(role => userRoles.includes(role));
    if (!hasRole) {
      router.navigate(['/']); // redirect if role not allowed
      return false;
    }
  }

  return true;
};