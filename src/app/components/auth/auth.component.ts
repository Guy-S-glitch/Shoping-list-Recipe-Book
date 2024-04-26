import { Router } from '@angular/router';
import { AuthService, ResponsePayload } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import { LOG_IN, LOG_IN_START } from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit() {
    this.initForm();
    this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.isLoading;
      this.errorMessage = authData.errorMessage;
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    let AuthObs: Observable<ResponsePayload>;
    this.isLoading = true;
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    if (this.isLoginMode) {
      this.store.dispatch(LOG_IN_START({ email, password }));
      // AuthObs = this.authService.signIn(email, password);
    } else {
      AuthObs = this.authService.signUp(email, password);
    }
    // AuthObs.subscribe(
    //   (responseData) => {
    //     console.log(responseData);
    //     this.isLoading = false;
    //     this.errorMessage = null;
    //     this.router.navigate(['./recipes']);
    //   },
    //   (error) => {
    //     this.errorMessage = error;
    //     this.isLoading = false;
    //   }
    // );
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
    this.errorMessage = null;
  }
}
