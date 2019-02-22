import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-upload-create',
  templateUrl: './stock-upload-create.page.html',
  styleUrls: ['./stock-upload-create.page.scss'],
})
export class StockUploadCreatePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  save(){
    this.router.navigateByUrl('/stock-upload-details');
  }
}
