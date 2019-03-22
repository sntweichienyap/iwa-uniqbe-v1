import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

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
import { GlobalVariableService } from "./../../services/global.service";

@Component({
  selector: "app-stock-upload-listing",
  templateUrl: "./stock-upload-listing.page.html",
  styleUrls: ["./stock-upload-listing.page.scss"]
})
export class StockUploadListingPage implements OnInit, OnDestroy {
  stockUploadIndexResponse = {} as IStockUploadIndexResponse;
  copyOfStockUploadIndexResponse = {} as IStockUploadIndexResponse;
  searchTerm = "";
  navigationSubscription: Subscription;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private globalService: GlobalVariableService,
    private apiService: ApiService,
    private loaderBox: Loader,
    private alertBox: Alert,
    private utils: Util,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.getStockUploadListing();
    this.databaseService.removeKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);
    this.utils.hideMenu(this.menu);

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url == "/stock-upload-listing"
        ) {
          this.getStockUploadListing();
          this.databaseService.removeKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  setFilteredItem() {
    this.resetAndAssignArrayList();

    if (this.searchTerm && this.searchTerm != "") {
      this.stockUploadIndexResponse.StockUploadIndexList = this.utils.filterItems(
        this.stockUploadIndexResponse.StockUploadIndexList,
        this.searchTerm,
        "DONo"
      );
    }
  }

  resetAndAssignArrayList() {
    this.stockUploadIndexResponse.StockUploadIndexList = this.copyOfStockUploadIndexResponse.StockUploadIndexList;
  }

  private getStockUploadListing() {
    let request: IStockUploadIndexRequest = {
      StatusCode: [Environment.STATUS_PENDING],
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadIndex(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.copyOfStockUploadIndexResponse = data;
            this.resetAndAssignArrayList();
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

  goToDetails(stockUploadID: Number) {
    this.router.navigateByUrl(`/stock-upload-details/${stockUploadID}`);
  }

  create() {
    this.router.navigateByUrl("/stock-upload-create");
  }
}
