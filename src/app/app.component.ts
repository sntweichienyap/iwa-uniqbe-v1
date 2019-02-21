import { Component } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthenticationService } from "./services/authentication.service";
import { ApiService } from "./services/api.service";
import { DatabaseService } from "./services/database.service";
import { Loader } from "./utils/loader";
import { Environment } from "./utils/environment";
import { Alert } from "./utils/alert";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  accessID: number;
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    }
  ];

  selectedPath = "";

  constructor(
    private databseService: DatabaseService,
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
    this.databseService.getUserDetails().then(data => {
      let accessID = data.accessID;

      this.loaderBox.present().then(() => {
        this.apiService.logout(accessID).subscribe(
          data => {
            this.loaderBox.dismiss();

            if (data.ResponseCode === Environment.API_FLAG_SUCCESS) {
              this.menu.enable(false);
              this.authService.logout();
            } else {
              this.alertBox.customShow(
                Environment.ALERT_HEADER_FAIL,
                data.ResponseMessage,
                Environment.ALERT_BUTTON_OK
              );
            }
          },
          error => {
            this.loaderBox.dismiss();
          }
        );
      });
    });
  }
}
