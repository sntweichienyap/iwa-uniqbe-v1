import { Base } from "./base.model";

export interface ILogin extends Base {
  Username: string;
  Name: string;
  CenterID: number;
  CenterName: string;
  CenterTypeCode: string;
  AccessID: number;
}

export interface ILogout extends Base {
}

export interface IForgotPassword extends Base {
}
