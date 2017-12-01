import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register, Login } from '../models/response.interface';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Register>('http://localhost:3000/api/user/register', user, {
      headers: headers
    });
  }

  loginUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Login>('http://localhost:3000/api/user/authenticate', user, {
      headers: headers
    });
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('status', 'loggedIn');
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



}
