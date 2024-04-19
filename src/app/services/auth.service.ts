import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
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
  user = new BehaviorSubject<User>(null);
  tokenExperationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
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
      .pipe(catchError(this.HandleError), tap(this.HandleAuthentication));
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
      .pipe(
        catchError(this.HandleError),
        tap((ResData: ResponsePayload) => this.HandleAuthentication(ResData))
      );
  }
  logOut() {
    this.user.next(null);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if (this.tokenExperationTimer) {
      clearTimeout(this.tokenExperationTimer);
    }
    this.tokenExperationTimer = null;
  }

  autoLogOut(experationTime: number) {
    console.log(experationTime);
    this.tokenExperationTimer = setTimeout(() => {
      this.logOut();
    }, experationTime);
  }
  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogOut(
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }
  private HandleAuthentication(resData: ResponsePayload) {
    const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expDate
    );
    this.user.next(user);
    this.autoLogOut(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private HandleError(errorRes: HttpErrorResponse) {
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
