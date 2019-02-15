import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Environment} from "./environment";
@Injectable()
export class Alert {

  constructor(
    public alertCtrl: AlertController
  ) {}

  async show(title: string, subTitle: string, buttons: Array<string>){
    let alert = await this.alertCtrl.create({        
      header: title,
      subHeader: subTitle,
      buttons: buttons
    });
    await alert.present();
  }

  async apiSuccessShow(){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_SUCCESS,
      subHeader: Environment.API_MESSAGE_SUCCESS,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async apiFailShow(){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_FAIL,
      subHeader: Environment.API_MESSAGE_FAIL,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async successShow(){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_SUCCESS,
      subHeader: Environment.ALERT_MESSAGE_SUCCESS,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async failShow(){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_FAIL,
      subHeader: Environment.API_MESSAGE_FAIL,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }
}