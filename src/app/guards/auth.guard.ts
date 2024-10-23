import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (authService.isAuthenticated()) return true

  const router = inject(Router)
  router.navigate(['/login'])

  return false
};
