import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FulfillmentItemDetailsPage } from './fulfillment-item-details.page';

const routes: Routes = [
  {
    path: '',
    component: FulfillmentItemDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FulfillmentItemDetailsPage]
})
export class FulfillmentItemDetailsPageModule {}
