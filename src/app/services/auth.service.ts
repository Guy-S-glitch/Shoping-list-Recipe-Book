import { Injectable } from '@angular/core';
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
  constructor(private store: Store<fromApp.AppState>) {}

  setLogOutTimer(experationTime: number) {
    console.log(experationTime);
    this.tokenExperationTimer = setTimeout(() => {
      this.store.dispatch(authAction.LOG_OUT());
    }, experationTime);
  }
  clearLogOutTimer() {
    if (this.tokenExperationTimer) {
      clearTimeout(this.tokenExperationTimer);
      this.tokenExperationTimer = null;
    }
  }
}
