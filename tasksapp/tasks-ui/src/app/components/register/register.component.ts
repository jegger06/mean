import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { EmailValidator } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastsManager,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister(f) {
    if (f.valid) {
      const user: User = {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password
      };
      this.authService.registerUser(user).subscribe((res) => {
        if (res.success) {
          this.toastr.success(res.msg, 'Success!');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res.msg, 'Oops!');
        }
      });
    } else {
      return false;
    }
  }

}
