import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import { DatabaseService } from './../../services/database.service';
import { Environment } from './../../utils/environment';

@Component({
  selector: 'app-stock-upload-create-item',
  templateUrl: './stock-upload-create-item.page.html',
  styleUrls: ['./stock-upload-create-item.page.scss'],
})
export class StockUploadCreateItemPage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit() {
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

  add() {
    this.router.navigateByUrl('/stock-upload-details');
  }
}
