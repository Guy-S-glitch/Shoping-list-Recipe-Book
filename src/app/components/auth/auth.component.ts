import { Router } from '@angular/router';
import { AuthService, ResponsePayload } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
  constructor(private authService: AuthService,private router:Router) {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit() {
    this.initForm();
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
      AuthObs = this.authService.signIn(email, password);
    } else {
      AuthObs = this.authService.signUp(email, password);
    } 
    AuthObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.errorMessage = null;
        this.router.navigate(['./recipes']); 
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;  
      }
    );
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
  handleError(){
    this.errorMessage=null;
  }
}
