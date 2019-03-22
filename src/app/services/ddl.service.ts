import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { ICenterIndexRequest } from "./../models/center.model";
import { IDdlResult } from "./../models/ddl.model";
import { GlobalVariableService } from "./global.service";
import { Environment } from "../utils/environment";
import { ICategoryIndexRequest } from "../models/category.model";
import { IBrandIndexRequest } from "../models/brand.model";
import { IModelIndexRequest } from "../models/model.model";
import { IColourIndexRequest } from "../models/colour.model";
import { ITypeIndexRequest } from "../models/type.model";

@Injectable({
  providedIn: "root"
})
export class DdlService {
  accessID = this.globalService.getAccessID();

  constructor(
    private apiService: ApiService,
    private globalService: GlobalVariableService
  ) { }

  getCategory(isSerial?: boolean) {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      Active: true,
      AccessID: this.accessID,
    } as ICategoryIndexRequest;

    this.apiService.categoryIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.CategoryItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.Name,
              FKValue: 0
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }

  getBrand(isSerial?: boolean) {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      Active: true,
      AccessID: this.accessID,
    } as IBrandIndexRequest;

    this.apiService.brandIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.BrandItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.Name,
              FKValue: i.CategoryID
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }

  getModel(isSerial?: boolean) {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      Active: true,
      AccessID: this.accessID,
    } as IModelIndexRequest;

    this.apiService.modelIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.ModelItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.Name,
              FKValue: i.BrandID
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }

  getColour(isSerial?: boolean) {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      Active: true,
      AccessID: this.accessID,
    } as IColourIndexRequest;

    this.apiService.colourIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.ColourItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.Name,
              FKValue: i.ModelID
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }

  getType(isSerial?: boolean) {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      Active: true,
      AccessID: this.accessID,
    } as ITypeIndexRequest;

    this.apiService.typeIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.TypeItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.Name,
              FKValue: 0
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }

  getCenter_Wh() {
    let ddlResult: IDdlResult = { Result: [] };
    let request = {
      CenterTypeCodes: [Environment.CENTER_TYPE_WAREHOUSE],
      Active: true,
      AccessID: this.globalService.getAccessID()
    } as ICenterIndexRequest;

    this.apiService.centerIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
          data.CenterItemList.forEach(i => {
            ddlResult.Result.push({
              Value: i.ID,
              Text: i.CenterName,
              FKValue: 0
            });
          });
        } else {
          console.log(data.ResponseMessage);
        }
      },
      error => {
        console.log(error);
      }
    );

    return ddlResult;
  }
}
