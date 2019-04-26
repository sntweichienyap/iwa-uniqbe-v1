import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";

@Component({
  selector: 'app-fulfillment-listing',
  templateUrl: './fulfillment-listing.page.html',
  styleUrls: ['./fulfillment-listing.page.scss'],
})
export class FulfillmentListingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  go() {
    this.router.navigateByUrl("/fulfillment-details");
  }
}
