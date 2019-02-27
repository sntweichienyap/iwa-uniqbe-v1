export interface IBaseRequest {
  AccessID: number;
  TenantID?: number;
}

export interface IBaseResponse {
  ResponseCode: string;
  ResponseMessage: string;
}
