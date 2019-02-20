import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-upload-details',
  templateUrl: './stock-upload-details.page.html',
  styleUrls: ['./stock-upload-details.page.scss'],
})
export class StockUploadDetailsPage implements OnInit {
  //declare variable
  isVisible = true;

  constructor() { }

  ngOnInit() {
  }

  toggleInfoList(){
    this.isVisible = !this.isVisible;
  }
}
