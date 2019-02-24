import { IBaseResponse } from "./base.model";

export interface ILoginResponse extends IBaseResponse {
  Username: string;
  Name: string;
  CenterID: number;
  CenterName: string;
  CenterTypeCode: string;
  AccessID: number;
}

export interface ILogoutResponse extends IBaseResponse {
}

export interface IForgotPasswordResponse extends IBaseResponse {
}
