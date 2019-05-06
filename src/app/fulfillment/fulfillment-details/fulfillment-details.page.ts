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
import {
  IFulfillmentDetailsRequest,
  IFulfillmentDetailsResponse
} from "src/app/models/fulfillment.model";

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
  //fulfillmentDetailsResponse = {} as IFulfillmentDetailsResponse;
  fulfillmentDetailsResponse = {
    OrderID: 0,
    CenterName: "",
    CenterAddrees: "",
    OrderDT: "",
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: FulfillmentRejectRemarkPage
    });
    return await modal.present();
  }

  edit() {
    this.router.navigateByUrl("/fulfillment-edit-details");
  }

  viewItem() {
    this.router.navigateByUrl("/fulfillment-item-details");
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
            console.log("assign the value here");
            
            console.log(JSON.stringify(this.fulfillmentDetailsResponse));
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
