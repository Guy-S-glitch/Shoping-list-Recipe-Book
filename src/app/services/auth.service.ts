import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(userEmail: string, userPassword: string) {
    return this.http.post<ResponsePayload>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDecGu6eqpU9ZPHhNq3jTJ3CdPkAH8zSbE',
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }
    );
  }
}
