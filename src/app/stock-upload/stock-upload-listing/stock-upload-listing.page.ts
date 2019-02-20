import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-upload-listing',
  templateUrl: './stock-upload-listing.page.html',
  styleUrls: ['./stock-upload-listing.page.scss'],
})
export class StockUploadListingPage implements OnInit {

  constructor(private router: Router) { }

  go() {
    this.router.navigateByUrl('/stock-upload-details');
  }

  ngOnInit() {
  }

}
