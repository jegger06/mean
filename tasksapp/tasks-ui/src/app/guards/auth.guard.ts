import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private toastr: ToastsManager,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      if (localStorage.getItem('token')) {
        this.toastr.error('Your token has been expired. Please log in again.', 'Error!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
      } else {
        this.toastr.error('You are not logged in! Please log in to visit the page.', 'Error!');
      }
      this.router.navigate(['/login'], {
        queryParams: {
          url: state.url
        }
      });
      return false;
    }
  }
}
