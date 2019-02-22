import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-upload-create-item',
  templateUrl: './stock-upload-create-item.page.html',
  styleUrls: ['./stock-upload-create-item.page.scss'],
})
export class StockUploadCreateItemPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  add(){
    this.router.navigateByUrl('/stock-upload-details');
  }
}
