import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { Environment } from "./../../utils/environment";
import { DatabaseService } from "./../../services/database.service";

@Component({
  selector: "app-stock-upload-item-details",
  templateUrl: "./stock-upload-item-details.page.html",
  styleUrls: ["./stock-upload-item-details.page.scss"]
})
export class StockUploadItemDetailsPage implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  onRemoveImei() {
    this.presentRemoveImeiAlertConfirm();
  }

  onBackToHome() {
    this.presentGoOtherPageAlertConfirm("/home");
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
}
