import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalesOrderListingPage } from './sales-order-listing.page';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalesOrderListingPage]
})
export class SalesOrderListingPageModule {}
