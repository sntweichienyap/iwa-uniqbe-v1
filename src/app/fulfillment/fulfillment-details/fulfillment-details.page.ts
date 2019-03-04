import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from 'src/app/modal-page/modal-page.page';
@Component({
  selector: 'app-fulfillment-details',
  templateUrl: './fulfillment-details.page.html',
  styleUrls: ['./fulfillment-details.page.scss'],
})
export class FulfillmentDetailsPage implements OnInit {

  constructor(private router: Router, public modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage
    });
    return await modal.present();
  }

  edit(){
    this.router.navigateByUrl('/fulfillment-edit-details');
  }
  viewItem(){
    this.router.navigateByUrl('/fulfillment-item-details');
  }
  
}
