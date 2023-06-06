import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  SignUp: boolean = false;
  form: FormGroup;
  formRegister: FormGroup;
  signIn: boolean = true;
  passwordHidden: boolean = false;
  creditsFalse: boolean = false;
  registered: boolean = false;
  accountExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formRegister = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  showSignIn() {
    if (this.signIn == false) {
      this.signIn = true;
      this.SignUp = false;
    } else {
      this.signIn = false;
    }
    return this.signIn;
  }
  showSignUp() {
    if (this.SignUp == false) {
      this.SignUp = true;
      this.signIn = false;
      this.form.clearValidators();
    } else {
      this.SignUp = false;
    }
    return this.SignUp;
  }

  showOrHide() {
    const password = document.getElementById('password');
    const ion = document.getElementById('ion');
    if (this.passwordHidden == false) {
      this.passwordHidden = true;
      password?.setAttribute('type', 'text');
      ion?.setAttribute('name', 'eye-off-outline');
    } else {
      this.passwordHidden = false;
      password?.setAttribute('type', 'password');
      ion?.setAttribute('name', 'eye-outline');
    }
  }
  submitForm() {
    this.userService.LoginUser(this.form.value).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/otp'])
      },
      error: (err) => {
        this.creditsFalse = true;
      },
    });
  }
  submitFormRegister() {
    this.userService.RegisterUser(this.formRegister.value).subscribe({
      next: (data) => {
        this.registered = true;
        this.accountExists = false;
      },
      error: (err) => {
        this.accountExists = true;
        this.registered = false;
      },
    });
  }
}
