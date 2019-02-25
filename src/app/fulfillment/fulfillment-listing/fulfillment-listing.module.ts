import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FulfillmentListingPage } from './fulfillment-listing.page';

const routes: Routes = [
  {
    path: '',
    component: FulfillmentListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FulfillmentListingPage]
})
export class FulfillmentListingPageModule {}
