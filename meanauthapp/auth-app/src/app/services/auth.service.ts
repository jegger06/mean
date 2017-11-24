import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate } from '../models/authenticate';
import { Profile } from '../models/profile';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('users/register', user, {
      headers: headers
    });
  }

  authenticateUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Authenticate>('users/authenticate', user, {
      headers: headers
    });
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get<Profile>('users/profile', {
      headers: headers
    });
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
