export interface IBaseRequest {
  AccessID: Number;
  TenantID?: Number;
}

export interface IBaseResponse {
  ResponseCode: String;
  ResponseMessage: String;
}
