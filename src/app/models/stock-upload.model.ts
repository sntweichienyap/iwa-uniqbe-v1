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
  CenterName: string;
  Subject: string;
  DONo: string;
  PONo?: string;
  ReceiveDT: string;
  AWBNumber: string;
  Remark: string;
  Status: string;
  POItemList: {
    ItemID: number;
    CategoryID: number;
    Category: string;
    BrandID: number;
    Brand: string;
    ModelID: number;
    Model: string;
    ColourID: number;
    Colour: string;
    TypeID: number;
    Type: string;
    IsSerial: boolean;
    OrderQuantity: number;
    FulfillQuantity: number;
  }[];
}

export interface IStockUploadCreateRequest extends BaseInterface.IBaseRequest {
  CenterID: number;
  Subject: string;
  DONo: string;
  PONo?: string;
  ReceivedDT: string;
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
  ReceivedDT: string;
  AWBNumber: string;
  Remark: string;
}

export interface IStockUploadUpdateResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
}

export interface IStockUploadConfirmRequest extends BaseInterface.IBaseRequest {
  StockUploadID: number;
}

export interface IStockUploadConfirmResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
}

export interface IStockUploadTempItemCreateRequest extends BaseInterface.IBaseRequest {
  StockUploadID: number;
}

export interface IStockUploadTempItemCreateResponse
  extends BaseInterface.IBaseResponse {
  StockUploadID: number;
  FileName: string;
  TempItemList: {
    Brand: string;
    Model:string;
    Colour: string;
    Type: string;
    SerialNo: string;
    BizUnit: string;
    Quantity: number;
  }[]
}


