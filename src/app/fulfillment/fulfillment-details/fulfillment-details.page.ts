import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";

import { FulfillmentRejectRemarkPage } from "./../fulfillment-reject-remark/fulfillment-reject-remark.page";
import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../..//services/api.service";
import { GlobalVariableService } from "./../../services/global.service";
import { IFulfillmentDetailsRequest } from "./../../models/fulfillment.model";

@Component({
  selector: "app-fulfillment-details",
  templateUrl: "./fulfillment-details.page.html",
  styleUrls: ["./fulfillment-details.page.scss"]
})
export class FulfillmentDetailsPage implements OnInit, OnDestroy {
  canConfirm = false;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  orderID: number;
  fulfillmentID: number;
  fulfillmentDetailsResponse = {
    OrderID: 0,
    FulfillmentID: 0,
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
    private modalController: ModalController,
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
          event.url.includes("/fulfillment-details")
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

  async onReject() {
    const modal = await this.modalController.create({
      component: FulfillmentRejectRemarkPage
    });
    return await modal.present();
  }

  onEdit() {
    this.router.navigateByUrl(`/fulfillment-edit-details/${this.orderID}/${this.fulfillmentID}`);
  }

  onViewItem() {
    this.router.navigateByUrl("/fulfillment-item-details");
  }

  onBackToHome(){
    this.router.navigateByUrl("/home");
  }

  onBackToIndex(){
    this.router.navigateByUrl("/fulfillment-listing");
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
            this.fulfillmentDetailsResponse.FulfillmentID = data.FulfillmentID;
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
