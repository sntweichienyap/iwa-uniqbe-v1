import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Environment} from "./environment";
@Injectable()
export class Alert {

  constructor(
    public alertCtrl: AlertController
  ) {}

  async apiSuccessShow(message: string = Environment.API_FLAG_SUCCESS){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_SUCCESS,
      message: message,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async apiFailShow(message: string = Environment.API_MESSAGE_FAIL){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_FAIL,
      message: message,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async successShow(message: string = Environment.ALERT_MESSAGE_SUCCESS){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_SUCCESS,
      message: message,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async failShow(message: string = Environment.ALERT_MESSAGE_FAIL){
    let alert = await this.alertCtrl.create({        
      header: Environment.ALERT_HEADER_FAIL,
      message: message,
      buttons: Environment.ALERT_BUTTON_OK
    });
    await alert.present();
  }

  async customShow(title: string, message: string, buttons: Array<string>){
    let alert = await this.alertCtrl.create({        
      header: title,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }
}