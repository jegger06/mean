import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Login } from './../../models/login';
import { AuthService } from './../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login = {
    username: '',
    password: ''
  };
  url: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => this.url = params.url || '/task/all');
  }

  onLogin(f) {
    if (f.valid) {
      this.authService.loginUser(f.value).subscribe((res) => {
        if (res.success) {
          this.authService.storeUserData(res.token, res.user);
          window.location.href = this.url;
        } else {
          this.toastr.error(res.msg, 'Opps!');
        }
      });
    } else {
      this.toastr.error('Something is wrong. Please fill in all fields.', 'Oops!');
    }
  }

}
