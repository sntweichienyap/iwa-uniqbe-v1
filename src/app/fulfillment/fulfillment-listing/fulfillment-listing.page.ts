import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";
import {
  IFulfillmentIndexResponse,
  IFulfillmentIndexRequest
} from "./../../models/fulfillment.model";
import { GlobalVariableService } from "./../../services/global.service";
import { ApiService } from "./../../services/api.service";
import { Loader } from "./../../utils/loader";
import { Alert } from "./../../utils/alert";
import { Util } from "./../../utils/util";
import { Environment } from "./../../utils/environment";

@Component({
  selector: "app-fulfillment-listing",
  templateUrl: "./fulfillment-listing.page.html",
  styleUrls: ["./fulfillment-listing.page.scss"]
})
export class FulfillmentListingPage implements OnInit, OnDestroy {
  fulfillmentIndexResponse = {} as IFulfillmentIndexResponse;
  copyOfFulfillmentIndexResponse = {} as IFulfillmentIndexResponse;
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
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.getFulfillmentListing();
    this.utils.hideMenu(this.menu);

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url == "/fulfillment-listing"
        ) {
          this.getFulfillmentListing();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onViewDetails(orderID:number, fulfillmentID: number) {
    this.router.navigateByUrl(`/fulfillment-details/${orderID}/${fulfillmentID}`);
  }
  
  setFilteredItem() {
    this.resetAndAssignArrayList();

    if (this.searchTerm && this.searchTerm != "") {
      this.fulfillmentIndexResponse.FulfillmentIndexList = this.utils.filterItems(
        this.fulfillmentIndexResponse.FulfillmentIndexList,
        this.searchTerm,
        "OrderID"
      );
    }
  }

  resetAndAssignArrayList() {
    this.fulfillmentIndexResponse.FulfillmentIndexList = this.copyOfFulfillmentIndexResponse.FulfillmentIndexList;
  }

  private getFulfillmentListing() {
    let request: IFulfillmentIndexRequest = {
      StatusCodes: [Environment.STATUS_APPROVED, Environment.STATUS_PROCESSING],
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.fulfillmentIndex(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {

            console.log(typeof(data.FulfillmentIndexList[0].OrderID));

            this.copyOfFulfillmentIndexResponse = data;
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
}
