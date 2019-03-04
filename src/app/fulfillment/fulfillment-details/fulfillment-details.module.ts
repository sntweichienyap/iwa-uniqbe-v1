import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FulfillmentDetailsPage } from './fulfillment-details.page';
import { ModalPagePage } from 'src/app/modal-page/modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: FulfillmentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FulfillmentDetailsPage, ModalPagePage],
  entryComponents:[ModalPagePage]
})
export class FulfillmentDetailsPageModule {}
