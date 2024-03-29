const baseUrl: string = 'https://podaci.onrender.com';
export const environment = {
  user: `${baseUrl}/api/user`,
  server: `${baseUrl}/api/server`,
  gpt: `${baseUrl}/api/gpt`,
};
export const developmentURI = {
  loginUserURI: `${environment.user}/sign`,
  registerUserURI: `${environment.user}`,
  resendOTPURI: `${environment.user}/resend`,
  chatgpt: `${environment.gpt}`,
  serversByID: `${environment.server}`,
  pingServer: `${environment.server}/update`,
  deleteOne: `${environment.server}`,
  createServer: environment.server,
  createServerWithHttps: `${environment.server}/with-https`,
  guestLogin: `${environment.user}/guest_sign`
};
