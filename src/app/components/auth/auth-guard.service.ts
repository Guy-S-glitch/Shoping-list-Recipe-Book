import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
  constructor(private authService: AuthService, private router: Router) {}
}
