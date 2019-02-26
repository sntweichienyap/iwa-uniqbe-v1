import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ICenterIndexRequest } from "./../models/center.model";
import { IDdlResult } from "./../models/ddl.model";
import { DatabaseService } from "./database.service";
import { Environment } from "../utils/environment";

@Injectable({
  providedIn: "root"
})
export class DdlService {
  constructor(
    private apiService: ApiService,
    private databaseService: DatabaseService
  ) {}

  getCenter_Wh() {
    let ddlResult: IDdlResult;
    let request = {
      CenterTypeCodes: [Environment.CENTER_TYPE_WAREHOUSE],
      Active: true,
      AccessID: this.databaseService.getUserDetails().AccessID
    } as ICenterIndexRequest;

    this.apiService.centerIndex(request).subscribe(
      data => {
        if (data.ResponseCode.isApiSuccess()) {
            //ddlResult.Result = data.CenterItemList;
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
