import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanLoad, CanActivate {

  constructor(
    private authService : AuthService,
    private router : Router
  ){

  }


  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.userIsAuthenticated
      .pipe(
        take(1),
        switchMap(
          (isAuth) => {
            if(!isAuth){
              return this.authService.autoLogin();
            }
            else {
              return of(isAuth);
            }
          }
        }),
        tap(
          (isAuthenticated) => {
            if (!isAuthenticated) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      )
  }
}
