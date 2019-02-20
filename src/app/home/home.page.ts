import { Component, OnInit } from "@angular/core";

import { DatabaseService } from "./../services/database.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  name:string;
  centerName: string;

  constructor(
    private databaseService: DatabaseService,
  ) { 
  }

  ngOnInit(): void {
    this.databaseService.getUserDetails().then(data =>{
      this.name = data.name;
      this.centerName = data.centerName;
    });
  }
}



