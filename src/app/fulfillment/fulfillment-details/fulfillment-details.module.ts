import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FulfillmentDetailsPage } from './fulfillment-details.page';
import { FulfillmentRejectRemarkPage } from './../fulfillment-reject-remark/fulfillment-reject-remark.page';

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
  declarations: [FulfillmentDetailsPage, FulfillmentRejectRemarkPage],
  entryComponents:[FulfillmentRejectRemarkPage]
})
export class FulfillmentDetailsPageModule {}
