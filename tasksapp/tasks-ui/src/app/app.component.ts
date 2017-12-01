import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    switch (localStorage.getItem('status')) {
      case 'registered':
        this.toastr.success('You are now registered and can now log in.', 'Success!');
        localStorage.removeItem('status');
        break;

      case 'loggedIn':
        this.toastr.success('You are now logged in!', 'Success!');
        localStorage.removeItem('status');
        break;

      default:
        break;
    }
  }
}
