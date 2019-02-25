import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable()
export class Loader {
  loader: any;

  constructor(public loadingCtrl: LoadingController) {}

  async present(msg = ``) {
    this.loader = await this.loadingCtrl.create({
      message: msg,
      spinner: "crescent"
    });
    return await this.loader.present();
  }

  async dismiss() {
    return await this.loader.dismiss();
  }
}
