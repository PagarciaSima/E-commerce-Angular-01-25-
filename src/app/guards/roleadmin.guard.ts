import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

export const roleadminGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionStorageService);
  const toastR = inject(ToastrService);
  const router = inject(Router);

  const userType = session.getItem('userType'); 
  if (userType === 'ADMIN') {
    return true; 
  }
  toastR.error("Only users with role ADMIN can access this resource", "Authorization error");
  return router.createUrlTree(['auth/denied']);
};
