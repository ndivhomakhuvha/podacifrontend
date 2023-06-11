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
  email: string;
  username: string;
  number: number;
  userId: number;
  token: string
}
