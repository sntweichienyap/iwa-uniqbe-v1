import * as BaseInterface from "./base.model";

export interface ICenterIndexRequest extends BaseInterface.IBaseRequest {
  CenterTypeCodes: Array<String>;
  Active: Boolean;
}

export interface ICenterIndexResponse extends BaseInterface.IBaseResponse {
  CenterItemList: {
    ID: Number;
    CenterName: String;
  }[];
}
