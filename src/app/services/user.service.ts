import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { developmentURI, environment } from 'src/environments/environment.development';
import { OTP, UserLogin, UserRegister } from '../Types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  LoginUser(User: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(developmentURI.loginUserURI, User);
  }
  RegisterUser(User: UserRegister) {
    return this.http.post<UserRegister>(developmentURI.registerUserURI,User);
  }
  resendOTP(email: any): Observable<OTP> {
    return this.http.post<OTP>(developmentURI.loginUserURI, email);
  }
}
