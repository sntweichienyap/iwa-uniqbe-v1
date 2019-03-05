import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd, ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { IStockUploadDetailsRequest } from "./../../models/stock-upload.model";
import { Environment } from "./../../utils/environment";
import { IStorageStockUploadItemList } from "./../../models/local-storage.model";

@Component({
  selector: "app-stock-upload-details",
  templateUrl: "./stock-upload-details.page.html",
  styleUrls: ["./stock-upload-details.page.scss"]
})
export class StockUploadDetailsPage implements OnInit, OnDestroy {
  isVisible = true;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  stockUploadID: number;
  storageStockUploadItemList = {} as IStorageStockUploadItemList;
  stockUploadDetails = {
    stockUploadID: 0,
    center: "",
    doNo: "",
    poNo: "",
    awbNo: "",
    subject: "",
    receiveDT: "",
    remark: "",
    status: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");
    });

    this.getStockUploadItemListFromStorage();
    this.getStockUploadDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url.includes("/stock-upload-details")
        ) {
          this.getStockUploadItemListFromStorage();
          this.getStockUploadDetails();
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

  private getStockUploadDetails() {
    let request: IStockUploadDetailsRequest = {
      StockUploadID: this.stockUploadID,
      AccessID: this.databaseService.getUserDetails().AccessID
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadDetails(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.stockUploadDetails.stockUploadID = data.StockUploadID;
            this.stockUploadDetails.center = data.CenterName;
            this.stockUploadDetails.doNo = data.DONo;
            this.stockUploadDetails.poNo = data.PONo;
            this.stockUploadDetails.awbNo = data.AWBNumber;
            this.stockUploadDetails.subject = data.Subject;
            this.stockUploadDetails.receiveDT = data.ReceiveDT;
            this.stockUploadDetails.remark = data.Remark;
            this.stockUploadDetails.status = data.Status;
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

  private getStockUploadItemListFromStorage() {
    let storageResult = this.databaseService.getKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);

    if (storageResult) {
      this.storageStockUploadItemList = JSON.parse(storageResult);
    }
  }

  onConfirm() {
    console.log("Confirm");
  }

  onUpdate() {
    this.router.navigateByUrl(
      `/stock-upload-edit-details/${this.stockUploadID}`
    );
  }

  onScanBarcode() {
    console.log("barcode scan");
  }

  onCreateItem() {
    this.router.navigateByUrl(`/stock-upload-create-item/${this.stockUploadID}`);
  }

  onViewItem() {
    this.router.navigateByUrl("/stock-upload-item-details");
  }

  onBackToHome() {
    this.presentAlertConfirm();
  }

  private async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Caution',
      message: 'Item added will be forfeit without confirm',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.databaseService.removeKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });

    await alert.present();
  }

  toggleInfoList() {
    this.isVisible = !this.isVisible;
  }
}
