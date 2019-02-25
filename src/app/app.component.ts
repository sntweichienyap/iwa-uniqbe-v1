import { Component } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthenticationService } from "./services/authentication.service";
import { ApiService } from "./services/api.service";
import { DatabaseService } from "./services/database.service";
import { Loader } from "./utils/loader";
import { Alert } from "./utils/alert";
import "./utils/extension-method";
import { ILogoutRequest } from "./models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    }
  ];

  selectedPath = "";

  constructor(
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    private menu: MenuController,
    private loaderBox: Loader,
    private alertBox: Alert
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(["home"]);
        } else {
          this.router.navigate(["login"]);
        }
      });

      this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;

        if (event.url === "/home") {
          this.menu.enable(true);
        }
      });
    });
  }

  logoutUser() {
    this.loaderBox.present().then(() => {
      let request: ILogoutRequest = {
        AccessID: this.databaseService.getUserDetail().AccessID || 258
      };
      
      this.apiService.logout(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.menu.enable(false);
            this.authService.logout();
          } else {
            this.alertBox.apiFailShow(data.ResponseMessage);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }
}
