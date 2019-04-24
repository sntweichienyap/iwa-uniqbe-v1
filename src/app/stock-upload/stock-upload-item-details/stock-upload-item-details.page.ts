import { Component, OnInit, OnDestroy } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router, Event, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";

import { Environment } from "./../../utils/environment";
import { DatabaseService } from "./../../services/database.service";
import { IStorageStockUploadItemList } from "./../../models/local-storage.model";

@Component({
  selector: "app-stock-upload-item-details",
  templateUrl: "./stock-upload-item-details.page.html",
  styleUrls: ["./stock-upload-item-details.page.scss"]
})
export class StockUploadItemDetailsPage implements OnInit, OnDestroy {
  storageStockUploadItemList = { ItemList: [] } as IStorageStockUploadItemList;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  storageStockUploadItemID: number;
  stockUploadID: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");
      this.storageStockUploadItemID = +params.get("storageStockUploadItemID");

      console.log(
        this.stockUploadID + " ==== " + this.storageStockUploadItemID
      );
    });

    this.getStockUploadItemListFromStorage();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url.includes("/stock-upload-item-details")
        ) {
          this.getStockUploadItemListFromStorage();
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

  onRemoveImei() {
    this.presentRemoveImeiAlertConfirm();
  }

  onBackToHome() {
    this.presentGoOtherPageAlertConfirm("/home");
  }

  onBackToDetails() {
    this.router.navigateByUrl(`/stock-upload-details/${this.stockUploadID}`);
  }

  private async presentGoOtherPageAlertConfirm(url: string) {
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
            this.router.navigateByUrl(url);
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentRemoveImeiAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Caution",
      message: "Selected Imei(s) will be removed",
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
            console.log("Item with ticked removed");
          }
        }
      ]
    });

    await alert.present();
  }

  private getStockUploadItemListFromStorage() {
    let storageResult = this.databaseService.getKeyValue(
      Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST
    );

    if (storageResult) {
      this.storageStockUploadItemList = JSON.parse(storageResult);
    }

    console.log(storageResult);
  }
}
