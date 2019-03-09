export interface IStorageUserDetails {
  Email: string;
  Password: string;
  Name: string;
  CenterID: number;
  CenterName: string;
  CenterTypeCode: string;
  TenantID: number;
  Tenant: string;
  AccessID: number;
}

export interface IStorageStockUploadItemList {
  ItemList: {
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
    SerialImei: string[];
  }[],
}
