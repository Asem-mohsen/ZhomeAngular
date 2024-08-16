import { CanActivateFn , Router } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { inject , afterNextRender} from '@angular/core';
import { User, Admin } from '../Interfaces/user';

export const authGuard: CanActivateFn = (route, state) => {

  const _AuthService: AuthService = inject(AuthService)
  const _router: Router = inject(Router);
  const userToken = localStorage.getItem('userToken');
  const currentUser = _AuthService.getCurrentUser();

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


  function isAdminUser(user: User | Admin): boolean {
    return 'IsAdmin' in user && user.IsAdmin === 1;
  }

}
