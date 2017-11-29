import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/response.interface';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Register>('http://localhost:3000/api/user/register', user, {
      headers: headers
    });
  }



}
