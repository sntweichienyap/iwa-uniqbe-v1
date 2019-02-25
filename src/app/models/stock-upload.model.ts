import * as BaseInterface from "./base.model";

export interface IStockUploadIndexRequest extends BaseInterface.IBaseRequest {
  StatusCode: Array<string>;
  CenterID?: Array<number>;
}

export interface IStockUploadIndexResponse extends BaseInterface.IBaseResponse {
  StockUploadIndexList: {
    DONo: string;
    Center: string;
  }[];
}

export interface IStockUploadCreateRequest extends BaseInterface.IBaseRequest {}

export interface IStockUploadCreateResponse
  extends BaseInterface.IBaseResponse {}
