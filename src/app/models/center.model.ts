import * as BaseInterface from "./base.model";

export interface ICenterIndexRequest extends BaseInterface.IBaseRequest {
  CenterTypeCodes: Array<string>;
  Active: boolean;
}

export interface ICenterIndexResponse extends BaseInterface.IBaseResponse {
  CenterItemList: {
    ID: number;
    CenterName: string;
  }[];
}
