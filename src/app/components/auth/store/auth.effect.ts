import { AuthService } from '../auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAction from './auth.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { User } from '../../../Models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app-state/app-state.reducer';

export interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private route: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  handleError = (errorRes: HttpErrorResponse) => {
    let ErrorMesssage = 'unknown error occurred';
    if (!(errorRes.error && errorRes.error.error)) {
      return of(
        this.store.dispatch(
          fromAction.AUTHENTICATE_FAIL({
            errorMessage: ErrorMesssage,
          })
        )
      );
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
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        ErrorMesssage =
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
        break;
    }
    return of(
      this.store.dispatch(
        fromAction.AUTHENTICATE_FAIL({
          errorMessage: ErrorMesssage,
        })
      )
    );
  };

  handleAuthentication = (resData: ResponsePayload) => {
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      new Date(new Date().getTime() + +resData.expiresIn * 1000)
    );
    this.store.dispatch(
      fromAction.AUTHENTICATE_SUCCESS({ user: user, redirect: true })
    );
    localStorage.setItem('userData', JSON.stringify(user));
  };

  authAutoLogIn = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.AUTO_LOGIN),
        map(() => {
          const user: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
          } = JSON.parse(localStorage.getItem('userData'));
          if (!user) {
            return { type: 'dummy' };
          }
          const loadedUser = new User(
            user.email,
            user.id,
            user._token,
            new Date(user._tokenExpirationDate)
          );
          if (loadedUser.token) {
            this.authService.setLogOutTimer(
              new Date(user._tokenExpirationDate).getTime() -
                new Date().getTime()
            );
            return this.store.dispatch(
              fromAction.AUTHENTICATE_SUCCESS({
                user: loadedUser,
                redirect: false,
              })
            );
          }
          return { type: 'dummy' };
        })
      ),
    { dispatch: false }
  );
  authAutoLogOut = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.LOG_OUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.authService.clearLogOutTimer();
          this.route.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
  authSignUp = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.SIGN_UP_START),
        switchMap((authData) => {
          return this.http
            .post<ResponsePayload>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                environment.firebaseAPIKey,
              {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogOutTimer(+resData.expiresIn * 1000);
              }),
              map((redData) => this.handleAuthentication(redData)),
              catchError((error) => this.handleError(error))
            );
        })
      ),
    { dispatch: false }
  );
  authLogIn = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.LOG_IN_START),
        switchMap((authData) => {
          return this.http
            .post<ResponsePayload>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseAPIKey,
              {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogOutTimer(+resData.expiresIn * 1000);
              }),
              map((resData) => this.handleAuthentication(resData)),
              catchError((errorRes) => this.handleError(errorRes))
            );
        })
      ),
    { dispatch: false }
  );
  redirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.AUTHENTICATE_SUCCESS),
        tap((authSeccessAction) => {
          if (authSeccessAction.redirect) {
            this.route.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );
}
