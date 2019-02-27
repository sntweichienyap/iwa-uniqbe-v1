import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-fulfillment-listing',
  templateUrl: './fulfillment-listing.page.html',
  styleUrls: ['./fulfillment-listing.page.scss'],
})
export class FulfillmentListingPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  go() {
    this.router.navigateByUrl("/fulfillment-details");
  }
}
