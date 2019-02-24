import { IBaseResponse } from "./base.model";

export interface StockUploadListing extends IBaseResponse{
    ProductNumber: number;
    ProductName: string;
    ProductDescription: string;
}

export interface StockUploadCreate extends IBaseResponse {
    ProductNumber: number;
    ProductName: string;
    ProductDescription: string;
}