import { Component, OnInit, OnDestroy } from "@angular/core";

import { DatabaseService } from "./../services/database.service";
import { Router, Event, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  name: string;
  centerName: string;
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd && this.router.url === "/home") {
            this.getUserDetails();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();;
    }
  }
  
  private getUserDetails() {
    let userDetails = this.databaseService.getUserDetails();
    this.name = userDetails.Name;
    this.centerName = userDetails.CenterName;
  }
}
