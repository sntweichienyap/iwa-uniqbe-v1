import * as BaseInterface from "./base.model";

export interface ITypeIndexRequest extends BaseInterface.IBaseRequest {
    Active: boolean;
}

export interface ITypeIndexResponse extends BaseInterface.IBaseResponse {
    TypeItemList: {
        ID: number;
        Name: string;
    }[];
}
