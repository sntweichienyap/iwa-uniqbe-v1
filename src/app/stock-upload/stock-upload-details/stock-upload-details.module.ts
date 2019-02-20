import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockUploadDetailsPage } from './stock-upload-details.page';

const routes: Routes = [
  {
    path: '',
    component: StockUploadDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockUploadDetailsPage]
})
export class StockUploadDetailsPageModule {}
