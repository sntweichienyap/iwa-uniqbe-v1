import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { MenuController } from "@ionic/angular";

import { DatabaseService } from "./../../services/database.service";
import {
  IStockUploadIndexRequest,
  IStockUploadIndexResponse
} from "./../../models/stock-upload.model";
import { ApiService } from "./../../services/api.service";
import { Loader } from "./../../utils/loader";
import { Environment } from "./../../utils/environment";
import { Alert } from "./../../utils/alert";
import { Util } from "./../../utils/util";

@Component({
  selector: "app-stock-upload-listing",
  templateUrl: "./stock-upload-listing.page.html",
  styleUrls: ["./stock-upload-listing.page.scss"]
})
export class StockUploadListingPage implements OnInit {
  stockUploadIndexResponse = {} as IStockUploadIndexResponse;
  filteredText = "";

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private loaderBox: Loader,
    private alertBox: Alert,
    private utils: Util,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.getStockUploadListing();
    this.utils.hideMenu(this.menu);
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === "/stock-upload-listing") {
          console.log("route");
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
          console.log("Hey ya");
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.stockUploadIndexResponse = data;
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
