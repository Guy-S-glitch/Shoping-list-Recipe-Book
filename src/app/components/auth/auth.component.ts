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
  constructor() {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit() {
    this.initForm();
  }
  onSubmit() {
    console.log(this.loginForm.value);
    
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6)]),
    });
  }
}
