import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-upload-details',
  templateUrl: './stock-upload-details.page.html',
  styleUrls: ['./stock-upload-details.page.scss'],
})
export class StockUploadDetailsPage implements OnInit {
  //declare variable
  isVisible = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  edit(){
    this.router.navigateByUrl('/stock-upload-edit-details');
  }
  add(){
    this.router.navigateByUrl('/stock-upload-create-item');
  }
  viewItem(){
    this.router.navigateByUrl('/stock-upload-item-details');
  }
  toggleInfoList(){
    this.isVisible = !this.isVisible;
  }
}
