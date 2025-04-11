export interface IAuthStrategy {

  login: (data: any) => Promise<any>;
}