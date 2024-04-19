import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(userEmail: string, userPassword: string) {
    return this.http
      .post<ResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDecGu6eqpU9ZPHhNq3jTJ3CdPkAH8zSbE',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this._HandleError));
  }
  signIn(userEmail: string, userPassword: string) {
    return this.http
      .post<ResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDecGu6eqpU9ZPHhNq3jTJ3CdPkAH8zSbE',
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this._HandleError));
  }

  private _HandleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    
    let ErrorMesssage = 'unknown error occurred';
    if (!(errorRes.error && errorRes.error.error)) {
      return throwError(ErrorMesssage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        ErrorMesssage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        ErrorMesssage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        ErrorMesssage =
          ' We have blocked all requests from this device due to unusual activity. Try again later.';
      case 'EMAIL_NOT_FOUND':
        ErrorMesssage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        ErrorMesssage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        ErrorMesssage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(ErrorMesssage);
  }
}
