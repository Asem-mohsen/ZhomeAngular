import { CanActivateFn , Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { inject , afterNextRender , PLATFORM_ID} from '@angular/core';
import { User, Admin } from '../Interfaces/user';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const _AuthService: AuthService = inject(AuthService)
  const _router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  let userToken: string | null = null;
  let currentUser: any = null;
  
  if (isPlatformBrowser(platformId)) {
    userToken = localStorage.getItem('userToken');
    currentUser = _AuthService.getCurrentUser();
  }

  if (userToken && currentUser) {
    if (route.data['adminOnly'] && !isAdminUser(currentUser)) {
      _router.navigate(['/home']);
      return false;
    }
    return true;
  } else {
    _router.navigate(['/login']);
    return false;
  }

  function isAdminUser(user: any): boolean {
    return 'IsAdmin' in user && user.IsAdmin === 1;
  }

}
