import * as BaseInterface from "./base.model";

export interface IModelIndexRequest extends BaseInterface.IBaseRequest {
    Active: boolean;
}

export interface IModelIndexResponse extends BaseInterface.IBaseResponse {
    ModelItemList: {
        ID: number;
        Name: string;
        BrandID: number;
    }[];
}
