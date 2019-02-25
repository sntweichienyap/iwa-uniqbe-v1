import { IBaseResponse, IBaseRequest } from "./base.model";

export interface ILoginRequest extends IBaseRequest{
  Username: string;
  Password: string;
}

export interface ILoginResponse extends IBaseResponse {
  Username: string;
  Name: string;
  CenterID: number;
  CenterName: string;
  CenterTypeCode: string;
  AccessID: number;
}

export interface ILogoutRequest extends IBaseRequest {
  AccessID: number;
}

export interface ILogoutResponse extends IBaseResponse {
}

export interface IForgotPasswordRequest extends IBaseRequest {
  Username: string;
}

export interface IForgotPasswordResponse extends IBaseResponse {
}
