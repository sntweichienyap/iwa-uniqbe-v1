import * as BaseInterface from "./base.model";

export interface IBrandIndexRequest extends BaseInterface.IBaseRequest {
  Active: boolean;
}

export interface IBrandIndexResponse extends BaseInterface.IBaseResponse {
    BrandItemList: {
    ID: number;
    Name: string;
    CategoryID: number;
  }[];
}
