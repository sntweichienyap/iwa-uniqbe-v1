import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
}