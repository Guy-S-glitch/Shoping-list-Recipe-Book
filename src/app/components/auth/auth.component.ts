import { Router } from '@angular/router';
import { AuthService, ResponsePayload } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import * as fromAction from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  loginForm: FormGroup;
  storeSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit() {
    this.initForm();
    this.storeSub = this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.isLoading;
      this.errorMessage = authData.errorMessage;
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    if (this.isLoginMode) {
      this.store.dispatch(fromAction.LOG_IN_START({ email, password }));
    } else {
      this.store.dispatch(fromAction.SIGN_UP_START({ email, password }));
    }
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }
  handleError() {
    this.store.dispatch(fromAction.CLEAN_ERROR());
  }
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
