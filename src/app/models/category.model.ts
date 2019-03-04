import * as BaseInterface from "./base.model";

export interface ICategoryIndexRequest extends BaseInterface.IBaseRequest {
  Active: boolean;
}

export interface ICategoryIndexResponse extends BaseInterface.IBaseResponse {
    CategoryItemList: {
    ID: number;
    Name: string;
  }[];
}
