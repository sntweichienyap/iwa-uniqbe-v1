import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockUploadCreateItemPage } from './stock-upload-create-item.page';

const routes: Routes = [
  {
    path: '',
    component: StockUploadCreateItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockUploadCreateItemPage]
})
export class StockUploadCreateItemPageModule {}
