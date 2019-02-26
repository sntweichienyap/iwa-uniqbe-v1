import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-stock-upload-listing",
  templateUrl: "./stock-upload-listing.page.html",
  styleUrls: ["./stock-upload-listing.page.scss"]
})
export class StockUploadListingPage implements OnInit, OnDestroy {
  stockUploadIndexResponse = {} as IStockUploadIndexResponse;
  originalIndexList;
  searchTerm = "";
  searchControl = new FormControl();
  navigationSubscription;

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private loaderBox: Loader,
    private alertBox: Alert,
    private utils: Util,
    private menu: MenuController,
    private form: ReactiveFormsModule
  ) {}

  ngOnInit() {
    this.getStockUploadListing();
    this.utils.hideMenu(this.menu);

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url == "/stock-upload-listing"
        ) {
          this.getStockUploadListing();
        }
      }
    );

    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(search => {
        this.setFilteredItem();
      });
  }

  setFilteredItem() {
    this.clearFilteredItem();
    this.stockUploadIndexResponse.StockUploadIndexList = this.utils.filterItems(
      this.originalIndexList,
      this.searchTerm,
      "DONo"
    );
  }

  clearFilteredItem() {
    this.stockUploadIndexResponse.StockUploadIndexList = this.originalIndexList;
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
            this.stockUploadIndexResponse = data;
            this.originalIndexList = data.StockUploadIndexList;
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

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  go(stockUploadID: Number) {
    console.log(stockUploadID);
    this.router.navigateByUrl("/stock-upload-details");
  }
  create() {
    this.router.navigateByUrl("/stock-upload-create");
  }
}
