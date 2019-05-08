import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup } from "@angular/forms";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../..//services/api.service";
import { GlobalVariableService } from "./../../services/global.service";
import {
  IFulfillmentDetailsRequest,
  IFulfillmentUpdateRequest
} from "./../../models/fulfillment.model";
import { Util } from "./../../utils/util";

@Component({
  selector: "app-fulfillment-edit-details",
  templateUrl: "./fulfillment-edit-details.page.html",
  styleUrls: ["./fulfillment-edit-details.page.scss"]
})
export class FulfillmentEditDetailsPage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  updateForm: FormGroup;
  orderID: number;
  fulfillmentID: number;
  fulfillmentDetailsResponse = {
    OrderID: 0,
    CenterName: "",
    CenterAddrees: "",
    OrderDate: "",
    OrderStatus: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private globalService: GlobalVariableService,
    private formBuilder: FormBuilder,
    private utils: Util
  ) {
    this.updateForm = formBuilder.group({
      despatcher: "",
      courierNum: "",
      orderRemark: ""
    });
  }

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

  onBackToHome() {
    this.router.navigateByUrl("/home");
  }

  onBackToDetails() {
    this.router.navigateByUrl(
      `/fulfillment-details/${this.orderID}/${this.fulfillmentID}`
    );
  }

  onUpdate(fab: IonFab) {
    let request: IFulfillmentUpdateRequest = {
      FulfillmentID: this.fulfillmentID,
      Despatcher: this.updateForm.controls.despatcher.value,
      CourierNum: this.updateForm.controls.courierNum.value,
      Remark: this.updateForm.controls.remark.value,
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.fulfillmentUpdate(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            fab.close();
            this.utils.resetForm(this.updateForm);
            this.router.navigateByUrl(
              `/fulfillment-details/${this.orderID}/${this.fulfillmentID}`
            );
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

            this.updateForm.patchValue({
              despatcher: data.Despatcher,
              courierNum: data.CourierNum,
              orderRemark: data.OrderRemark
            });
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
