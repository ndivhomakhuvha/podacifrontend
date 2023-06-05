import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signIn: boolean = false;
  SignUp: boolean = false;

  // showSignIn(){
  //   const signInContainer = document.querySelector('.inputContainerSignIn');
  //   const signUpContainer = document.querySelector('.inputContainerSignUp');
  //   const signInButton = document.querySelector('.sign_in_button');
  //   const signUpButton = document.querySelector('.sign_up_button')

  // }

  
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
    } else {
      this.SignUp = false;
    }
    return this.SignUp;
  }
}
