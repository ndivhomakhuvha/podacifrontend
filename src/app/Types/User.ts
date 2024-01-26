export interface UserLogin {
  email?: string;
  password?: string;
}
export interface UserRegister {
  username?: string;
  email?: string;
  password?: string;
}
export interface OTP {
  userId: number;
  token: string;
}
export interface UserDetailsStorage{
  email: string;
  username: string;
}
export interface updateDto {
  username: string;
  email: string;
  userId: number;
}
export interface verifyTheOTP {
  otp:number
}
export interface GuestLogin {
  email:    string;
  username: string;
  userId:   number;
  token:    string;
}
