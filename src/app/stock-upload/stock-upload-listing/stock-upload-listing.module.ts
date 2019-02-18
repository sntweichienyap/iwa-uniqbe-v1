import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockUploadListingPage } from './stock-upload-listing.page';

const routes: Routes = [
  {
    path: '',
    component: StockUploadListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockUploadListingPage]
})
export class StockUploadListingPageModule {}
