import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionStorageService);
  const router = inject(Router);
  const toastr = inject(ToastrService); // Inyectamos ToastrService

  if (session.getItem('token') != null) {
    return true;
  }

  return router.createUrlTree(['/user/login']);
};
