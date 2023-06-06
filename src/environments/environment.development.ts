const baseUrl: string = 'http://localhost:3000';
export const environment = {
  user: `${baseUrl}/api/user`,
  server: `${baseUrl}/api/server`,
  gpt: `${baseUrl}/api/gpt`,
};
export const developmentURI = {
  loginUserURI: `${environment.user}/sign`,
  registerUserURI: `${environment.user}`
}