import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http
      .post<ResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDecGu6eqpU9ZPHhNq3jTJ3CdPkAH8zSbE',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          let ErrorMesssage = 'unknown error occurred';
          if (!(error.error && error.error.error)) {
            return throwError(ErrorMesssage);
          }
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              ErrorMesssage = 'this email already exist';
          }
          return throwError(ErrorMesssage);
        })
      );
  }
}
