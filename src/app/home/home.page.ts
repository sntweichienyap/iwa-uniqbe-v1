import { Component, OnInit } from "@angular/core";

import { DatabaseService } from "./../services/database.service";
import { IUserDetailsStorage } from "../models/local-storage.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  name: string;
  centerName: string;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.name = this.databaseService.getUserDetail().Name;
    this.centerName = this.databaseService.getUserDetail().CenterName;
  }
}
