import * as BaseInterface from "./base.model";

export interface IUnitOFMeasureIndexRequest extends BaseInterface.IBaseRequest {
    Active: boolean;
}

export interface IUnitOfMeasureIndexResponse extends BaseInterface.IBaseResponse {
    UOMIndexList: {
        ID: number;
        Code: string;
        Description: string;
        ModelID: number;
    }[];
}
