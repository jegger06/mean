import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.flashMessages.show('You are not logged in. Please log in to visit the page.', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/login']);
      return false;
    }
  }
}
