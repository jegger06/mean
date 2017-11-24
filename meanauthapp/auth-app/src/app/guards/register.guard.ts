import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.loggedIn()) {
      return true;
    } else {
      this.flashMessages.show('Can\'t access this route. You are already logged in', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
