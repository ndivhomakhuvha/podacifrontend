import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  developmentURI,
  environment,
} from 'src/environments/environment.development';
import {
  GuestLogin,
  OTP,
  UserDetailsStorage,
  UserLogin,
  UserRegister,
  verifyTheOTP,
} from '../Types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user_id: number;
  constructor(private http: HttpClient) {}
  LoginUser(User: UserLogin): Observable<any> {
    return this.http.post<any>(developmentURI.loginUserURI, User);
  }
  RegisterUser(User: UserRegister) {
    return this.http.post<UserRegister>(developmentURI.registerUserURI, User);
  }
  resendOTP(email: any): Observable<OTP> {
    return this.http.post<OTP>(developmentURI.resendOTPURI, email);
  }
  updateUser(updatedDet: UserRegister, userid: number) {
    return this.http.put(
      `${developmentURI.registerUserURI}/update/${userid}`,
      updatedDet
    );
  }
  guestSignIn(User: UserLogin): Observable<GuestLogin> {
    return this.http.post<GuestLogin>(developmentURI.guestLogin, User);
  }
  verifyOtp(body: verifyTheOTP): Observable<UserDetailsStorage> {
    let value = localStorage.getItem('user');
    let user_id;
    if (value != null) {
      user_id = JSON.parse(value) as OTP;
    }
   
    return this.http.post<UserDetailsStorage>(
      `${developmentURI.verifyOtp}/${user_id?.userId}`,
      body
    );
  }
}
