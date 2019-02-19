import { Injectable } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Injectable()
export class Loader {

  loader: any;
  isLoading = false;

  constructor(
    public loadingCtrl: LoadingController
  ) { }

  async present(msg = `Please wait...`) {
    this.isLoading = true;
    this.loader = await this.loadingCtrl.create({
        message: msg,
        spinner: 'crescent',
    });
    return await this.loader.present();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loader.dismiss();
  }
}