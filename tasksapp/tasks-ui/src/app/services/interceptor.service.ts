import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastsManager
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Set the content-type of all requests
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });

    // Do not do anything if it requests to the authenticate and register route
    const urls = ['authenticate', 'register'];
    const urlHolder = req.url.split('/');
    if (urls.includes(urlHolder[urlHolder.length - 1])) {
      return next.handle(req);
    }

    // Attached the authorization header to other routes
    req = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')
      }
    });

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do anything with the response before processing it
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route or show a modal if unauthorized
          this.toastr.error(`You can\'t access the <strong>${this.router.url}</strong> route.`, `${err.statusText}!`, {enableHTML: true});
          this.router.navigate(['/']);
        }
      }
    });

  }

}
