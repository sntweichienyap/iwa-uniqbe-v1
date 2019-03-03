import * as BaseInterface from "./base.model";

export interface IColourIndexRequest extends BaseInterface.IBaseRequest {
    Active: boolean;
}

export interface IColourIndexResponse extends BaseInterface.IBaseResponse {
    ColourItemList: {
        ID: number;
        Name: string;
        ModelID: number;
    }[];
}
