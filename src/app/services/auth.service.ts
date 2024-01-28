import { Injectable } from '@angular/core';
import { GuestLogin, OTP } from '../Types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: any;
  user?: OTP;
  constructor() {}
  isAuthenticated(): Boolean {
    this.accessToken = localStorage.getItem('user') || localStorage.getItem('guest_user');
    
    if (this.accessToken != null) {
      this.user = JSON.parse(this.accessToken) as  OTP;
      const accessTokenValue = this.user.token;
  
      return !!accessTokenValue;
    }
    return false;
  }
}
