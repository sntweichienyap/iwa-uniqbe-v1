import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-fulfillment-details',
  templateUrl: './fulfillment-details.page.html',
  styleUrls: ['./fulfillment-details.page.scss'],
})
export class FulfillmentDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  edit(){
    this.router.navigateByUrl('/fulfillment-edit-details');
  }
  viewItem(){
    this.router.navigateByUrl('/fulfillment-item-details');
  }
}
