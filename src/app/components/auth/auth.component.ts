import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  errorMessage: string = null;
  loginForm: FormGroup;
  constructor(private authService: AuthService) {}
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
    if (this.isLoginMode) {
    } else {
      this.isLoading = true;
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];
      this.authService.signup(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
        },
        (error) => { 
          this.errorMessage=error;
          this.isLoading = false;
        }
      );
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
}
