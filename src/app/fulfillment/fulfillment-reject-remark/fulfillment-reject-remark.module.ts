import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FulfillmentRejectRemarkPage } from './fulfillment-reject-remark.page';

const routes: Routes = [
  {
    path: '',
    component: FulfillmentRejectRemarkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FulfillmentRejectRemarkPage]
})
export class FulfillmentRejectRemarkPageModule {}
