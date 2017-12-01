import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
    this.toastr.success('You are now logged out!', 'Success!');
    this.router.navigate(['/']);
  }

}
