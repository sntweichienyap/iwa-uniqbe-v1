import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
@Component({
  selector: 'app-sales-order-listing',
  templateUrl: './sales-order-listing.page.html',
  styleUrls: ['./sales-order-listing.page.scss'],
})
export class SalesOrderListingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  go() {
    this.router.navigateByUrl("/sales-order-details");
  }
}
