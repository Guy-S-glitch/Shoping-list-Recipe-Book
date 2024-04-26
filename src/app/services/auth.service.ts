import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-state/app-state.reducer';
import * as authAction from '../components/auth/store/auth.action';

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
  // user = new BehaviorSubject<User>(null);
  tokenExperationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  
  logOut() {
    this.store.dispatch(authAction.LOG_OUT());
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
      this.store.dispatch(
        authAction.AUTHENTICATE_SUCCESS({ user: loadedUser })
      );
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
    this.store.dispatch(authAction.AUTHENTICATE_SUCCESS({ user: user }));
    this.autoLogOut(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
