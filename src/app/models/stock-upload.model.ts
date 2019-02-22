import { Base } from "./base.model";

export interface StockUploadListing extends Base{
    ProductNumber: number;
    ProductName: string;
    ProductDescription: string;
}

export interface StockUploadCreate extends Base {
    ProductNumber: number;
    ProductName: string;
    ProductDescription: string;
}