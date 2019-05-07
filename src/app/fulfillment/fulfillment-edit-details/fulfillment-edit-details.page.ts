import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../..//services/api.service";
import { GlobalVariableService } from "./../../services/global.service";
import { IFulfillmentDetailsRequest } from "src/app/models/fulfillment.model";

@Component({
  selector: "app-fulfillment-edit-details",
  templateUrl: "./fulfillment-edit-details.page.html",
  styleUrls: ["./fulfillment-edit-details.page.scss"]
})
export class FulfillmentEditDetailsPage implements OnInit {
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  orderID: number;
  fulfillmentID: number;
  fulfillmentDetailsResponse = {
    OrderID: 0,
    CenterName: "",
    CenterAddrees: "",
    OrderDate: "",
    OrderStatus: "",
    CourierNum: "",
    Despatcher: "",
    OrderRemark: "",
    OrderFulfillmentItemList: []
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private globalService: GlobalVariableService
  ) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.orderID = +params.get("orderID");
      this.fulfillmentID = +params.get("fulfillmentID");
    });

    this.getFulfillmentDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url.includes("/fulfillment-edit-details")
        ) {
          this.getFulfillmentDetails();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onBackToHome(){
    this.router.navigateByUrl("/home");
  }

  onBackToDetails(){
    this.router.navigateByUrl(`/fulfillment-details/${this.orderID}/${this.fulfillmentID}`);
  }

  onUpdate(){

  }

  private getFulfillmentDetails() {
    let request: IFulfillmentDetailsRequest = {
      OrderID: this.orderID,
      FulfillmentID: this.fulfillmentID,
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.fulfillmentDetails(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.fulfillmentDetailsResponse.OrderID = data.OrderID;
            this.fulfillmentDetailsResponse.CenterName = data.CenterName;
            this.fulfillmentDetailsResponse.CenterAddrees = data.CenterAddrees;
            this.fulfillmentDetailsResponse.OrderDate = new Date(
              data.OrderDT
            ).formatDate();
            this.fulfillmentDetailsResponse.OrderStatus = data.OrderStatus;
            this.fulfillmentDetailsResponse.CourierNum = data.CourierNum;
            this.fulfillmentDetailsResponse.Despatcher = data.Despatcher;
            this.fulfillmentDetailsResponse.OrderRemark = data.OrderRemark;

            if (data.OrderFulfillmentItemList) {
              data.OrderFulfillmentItemList.forEach(element => {
                this.fulfillmentDetailsResponse.OrderFulfillmentItemList.push({
                  OrderItemID: element.OrderItemID,
                  IsSerialized: element.IsSerialized,
                  Model: element.Model,
                  OrderQty: element.OrderQty,
                  BalanceQty: element.BalanceQty,
                  FulfilledQty: element.FulfilledQty
                });
              });
            }
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
