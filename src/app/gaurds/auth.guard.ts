import { CanActivateFn , Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { inject , afterNextRender , PLATFORM_ID} from '@angular/core';
import { User, Admin } from '../Interfaces/user';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const _AuthService: AuthService = inject(AuthService)
  const _router: Router = inject(Router);

  if (_AuthService.isAuthenticated()) {
    // the user is authenticated, redirect away from the login/register pages
    _router.navigate(['/home']);
    return false;
  } else {
    // Allow access to the route (login/register)
    return true;
  }

  // let userToken: string | null = null;
  // let currentUser: any = null;

  // if (isPlatformBrowser(platformId)) {
  //   userToken = localStorage.getItem('userToken');
  //   currentUser = _AuthService.getCurrentUser();
  // }

  // if (userToken && currentUser) {
  //   if (route.data['adminOnly'] && !isAdminUser(currentUser)) {
  //     _router.navigate(['/home']);
  //     return false;
  //   }
  //   return true;
  // } else {
  //   _router.navigate(['/login']);
  //   return false;
  // }

  // function isAdminUser(user: any): boolean {
  //   return 'IsAdmin' in user && user.IsAdmin === 1;
  // }

}
