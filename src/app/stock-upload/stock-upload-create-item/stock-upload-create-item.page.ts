import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { GlobalVariableService } from "./../../services/global.service";
import { DdlService } from "./../../services/ddl.service";
import { IDdlResult } from "./../../models/ddl.model";
import { DatabaseService } from "./../../services/database.service";
import { Environment } from "./../../utils/environment";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { Util } from "./../../utils/util";
import {
  IModelIndexResponse,
  IModelIndexRequest
} from "./../../models/model.model";

@Component({
  selector: "app-stock-upload-create-item",
  templateUrl: "./stock-upload-create-item.page.html",
  styleUrls: ["./stock-upload-create-item.page.scss"]
})
export class StockUploadCreateItemPage implements OnInit, OnDestroy {
  brandList: IDdlResult;
  modelList: IDdlResult;
  colourList: IDdlResult;
  typeList: IDdlResult;
  categoryList: IDdlResult;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  createItemForm: FormGroup;
  stockUploadID: number;
  modelIndexResponse: IModelIndexResponse;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private databaseService: DatabaseService,
    private ddlService: DdlService,
    private formBuilder: FormBuilder,
    private utils: Util,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private globalService: GlobalVariableService
  ) {
    this.createItemForm = formBuilder.group({
      categoryID: 0,
      brandID: 0,
      modelID: 0,
      colourID: 0,
      typeID: 0,
      quantity: 0
    });
  }

  ngOnInit() {
    this.getAllDropdownlist();
    this.getModelDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url == "/stock-upload-create-item"
        ) {
          this.getAllDropdownlist();
        }
      }
    );

    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  onCreate() {
    console.log(this.createItemForm.controls.categoryID.value);
    console.log(this.createItemForm.controls.brandID.value);
    console.log(this.createItemForm.controls.modelID.value);
    console.log(this.createItemForm.controls.colourID.value);
    console.log(this.createItemForm.controls.typeID.value);
    console.log(this.createItemForm.controls.quantity.value);

    this.utils.resetForm(this.createItemForm);

    // After save to database, pop alert say item created and clear the form

    // this.router.navigateByUrl(`/stock-upload-details/${this.stockUploadID}`);
  }

  onBackToHome() {
    this.presentAlertConfirm();
  }

  private async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Caution",
      message: "Item added will be forfeit without confirm",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: result => {}
        },
        {
          text: "Okay",
          handler: () => {
            this.databaseService.removeKeyValue(
              Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST
            );
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });

    await alert.present();
  }

  private getAllDropdownlist() {
    this.categoryList = this.ddlService.getCategory();
    this.brandList = this.ddlService.getBrand();
    this.modelList = this.ddlService.getModel();
    this.colourList = this.ddlService.getColour();
    this.typeList = this.ddlService.getType();
  }

  private getModelDetails() {
    let request: IModelIndexRequest = {
      Active: true,
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.modelIndex(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.modelIndexResponse = data;
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
