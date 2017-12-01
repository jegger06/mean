import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.loggedIn()) {
      return true;
    } else {
      // tslint:disable-next-line:max-line-length
      this.toastr.warning(`You can't access the <strong>${state.url}</strong> route. You are already logged in!`, 'Warning!', {enableHTML: true});
      this.router.navigate(['/task/all']);
      return false;
    }
  }
}
