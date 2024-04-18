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
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];
      this.authService.signup(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.error.error.message);
        }
      );
    }
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6)]),
    });
  }
}
