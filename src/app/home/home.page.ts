import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "./../services/database.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private databaseService: DatabaseService) {}
  ngOnInit(): void {
    alert(this.databaseService.getUserDetails());
  }

  
}
