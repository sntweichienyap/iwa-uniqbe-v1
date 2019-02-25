import { Component, OnInit } from "@angular/core";

import { DatabaseService } from "./../services/database.service";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  name: string;
  centerName: string;
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === "/stock-upload-listing") {
          this.getUserDetails();
        }
      }
    });
  }

  private getUserDetails() {
    this.name = this.databaseService.getUserDetails().Name;
    this.centerName = this.databaseService.getUserDetails().CenterName;
  }
}
