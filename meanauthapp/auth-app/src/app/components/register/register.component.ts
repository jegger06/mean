import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Register } from '../../models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(f) {
    if (f.valid) {
      const user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      };

      this.authService.registerUser(user).subscribe((data: Register) => {
        console.log(data);
        if (data.success) {
          this.flashMessages.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          // tslint:disable-next-line:max-line-length
          this.flashMessages.show('Something wen\'t wrong, please check all the fields and try again.', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }
      });
    } else {
      this.flashMessages.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }

}
