import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private menu: MenuController
  ) { }

  ngOnInit() { 
    this.menu.enable(false);
  }

  loginUser() {
    let isLoginSuccess = true;

    // Call authentication web service here

    if (!isLoginSuccess) {
      this.alertBox.show("Failed", "Test", ["OK"]);

      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      this.menu.enable(true);

      this.authService.login();
    }
  }
}
