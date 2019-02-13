import { Injectable } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Injectable()
export class Loader {

  loader: any;

  constructor(
    public loadingCtrl: LoadingController
  ) {}

  async present(msg = `Please wait...`) {
    this.loader = await this.loadingCtrl.create({
        message: msg,
        spinner: 'crescent',
    });
    this.loader.present();
  }

  dismiss() {
    this.loader.dismiss();
  }
}