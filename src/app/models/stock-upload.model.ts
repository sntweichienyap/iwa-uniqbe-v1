import * as BaseInterface from "./base.model";

export interface IStockUploadIndexRequest extends BaseInterface.IBaseRequest {
  StatusCode: Array<string>;
  CenterID?: Array<number>;
}

export interface IStockUploadIndexResponse extends BaseInterface.IBaseResponse {
  StockUploadIndexList: {
    StockUploadID: number;
    DONo: string;
    Center: string;
  }[];
}

export interface IStockUploadCreateRequest extends BaseInterface.IBaseRequest {
  CenterID: number;
  Subject: string;
  DONo: string;
  AWBNumber: string;
}

export interface IStockUploadCreateResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: Number;
}
