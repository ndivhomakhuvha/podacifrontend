import { Injectable } from '@angular/core';
import { GuestLogin, OTP } from '../Types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: any;
  user?: GuestLogin;
  constructor() {}
  isAuthenticated(): Boolean {
    this.accessToken = localStorage.getItem('user');
    if (this.accessToken != null) {
      this.user = JSON.parse(this.accessToken) as GuestLogin | OTP;
      const accessTokenValue = this.user.token;

      return !!accessTokenValue;
    }
    return false;
  }
}
