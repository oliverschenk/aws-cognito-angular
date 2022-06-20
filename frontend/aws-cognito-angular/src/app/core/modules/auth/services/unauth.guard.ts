import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsLoggedIn } from '../state/auth';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private store$: Store) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store$.select(selectIsLoggedIn).pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
        return !isLoggedIn;
      })
    );
  }
}
