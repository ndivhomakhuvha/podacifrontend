import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OTP } from '../Types/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userString: any;
  user: OTP;

  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(): boolean {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    const token = this.user.token
    return !this.jwtHelper.isTokenExpired(token);
  }

}
