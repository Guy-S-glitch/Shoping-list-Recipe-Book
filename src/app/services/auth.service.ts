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
  tokenExperationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  
  logOut() {
    // this.store.dispatch(authAction.LOG_OUT());
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
  
}
