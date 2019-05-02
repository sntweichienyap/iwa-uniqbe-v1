import * as BaseInterface from "./base.model";

export interface IFulfillmentIndexRequest extends BaseInterface.IBaseRequest {
  StatusCodes: Array<string>;
}

export interface IFulfillmentIndexResponse extends BaseInterface.IBaseResponse {
  FulfillmentIndexList: {
    OrderID: number;
    FulfillmentID: number;
    Center: string;
  }[];
}

export interface IFulfillmentDetailsRequest extends BaseInterface.IBaseRequest {
  OrderID: number;
  FulfillmentID: number;
}

export interface IFulfillmentDetailsResponse
  extends BaseInterface.IBaseResponse {
  OrderID: number;
  CenterName: string;
  CenterAddrees: string;
  OrderDT: string;
  OrderStatus: string;
  CourierNum: string;
  Despatcher: string;
  OrderRemark: string;
  OrderFulfillmentItemList: {
    OrderItemID: number;
    IsSerialized: boolean;
    Model: string;
    OrderQty: number;
    BalanceQty: number;
    FulfilledQty: number;
  }[];
}

export interface IFulfillmentUpdateRequest extends BaseInterface.IBaseRequest {
  FulfillmentID: number;
  CourierNum: string;
  Despatcher: string;
  Remark: string;
}

export interface IFulfillmentUpdateResponse
  extends BaseInterface.IBaseResponse {
  FulfillmentID: number;
}
