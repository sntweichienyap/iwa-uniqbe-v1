import { Component, OnInit, OnDestroy } from "@angular/core";

import { DatabaseService } from "./../services/database.service";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  userDetailsSubscription;
  name: string;
  centerName: string;
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails();

    this.userDetailsSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd && this.router.url === "/home") {
            this.getUserDetails();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.userDetailsSubscription) {
      this.userDetailsSubscription.unsubscribe();;
    }
  }
  
  private getUserDetails() {
    let userDetails = this.databaseService.getUserDetails();
    console.log(userDetails);
    this.name = userDetails.Name;
    this.centerName = userDetails.CenterName;
  }
}
