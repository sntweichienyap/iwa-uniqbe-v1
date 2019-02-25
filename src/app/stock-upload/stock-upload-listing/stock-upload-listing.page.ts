import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { DatabaseService } from "./../../services/database.service";
import {
  IStockUploadIndexRequest,
  IStockUploadIndexResponse
} from "./../../models/stock-upload.model";
import { ApiService } from "src/app/services/api.service";
import { Loader } from "src/app/utils/loader";
import "./../../utils/environment";
import { Environment } from "./../../utils/environment";
import { Alert } from "./../../utils/alert";

@Component({
  selector: "app-stock-upload-listing",
  templateUrl: "./stock-upload-listing.page.html",
  styleUrls: ["./stock-upload-listing.page.scss"]
})
export class StockUploadListingPage implements OnInit {
  stockUploadListing = {} as IStockUploadIndexResponse;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private loaderBox: Loader,
    private alertBox: Alert
  ) {}

  ngOnInit() {
    this.getStockUploadListing();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === "/stock-upload-listing") {
          this.getStockUploadListing();
        }
      }
    });
  }

  private getStockUploadListing() {
    let request: IStockUploadIndexRequest = {
      StatusCode: [Environment.STATUS_PENDING],
      AccessID: this.databaseService.getUserDetails().AccessID
    };

    this.loaderBox.present().then(() => {    
      this.apiService.stockUploadIndex(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.stockUploadListing = data;
          } else {
            this.alertBox.apiFailShow(data.ResponseMessage);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }

  go() {
    this.router.navigateByUrl("/stock-upload-details");
  }
  create() {
    this.router.navigateByUrl("/stock-upload-create");
  }
}
