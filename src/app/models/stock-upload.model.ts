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

export interface IStockUploadDetailsRequest extends BaseInterface.IBaseRequest {
  StockUploadID: number;
}

export interface IStockUploadDetailsResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
  CenterID: number;
  Subject: string;
  DONo: string;
  PONo?: string;
  ReceivedDT: string;
  AWBNumber: string;
  Remark: string;
  Status: string;
}

export interface IStockUploadCreateRequest extends BaseInterface.IBaseRequest {
  CenterID: number;
  Subject: string;
  DONo: string;
  PONo?: string;
  ReceivedDT?: String;
  AWBNumber: string;
  Remark: string;
}

export interface IStockUploadCreateResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
}

export interface IStockUploadUpdateRequest extends BaseInterface.IBaseRequest {
  StockUploadID: number;
  CenterID: number;
  Subject: string;
  DONo: string;
  PONo?: string;
  ReceivedDT?: string;
  AWBNumber: string;
  Remark: string;
}

export interface IStockUploadUpdateResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
}

