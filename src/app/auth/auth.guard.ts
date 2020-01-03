import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';

import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   return this.router.navigate(['/login']);
    // }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   return this.router.navigate(['/login']);
    // }
  }

}
