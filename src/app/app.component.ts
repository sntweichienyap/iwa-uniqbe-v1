import { Component } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { Platform, MenuController } from "@ionic/angular";

import { AuthenticationService } from "./services/authentication.service";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

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
    },];

  selectedPath = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    private menu: MenuController
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

        if (event.url === '/home') {
          this.menu.enable(true);
        }
      });
    });
  }

  logoutUser() {
    this.menu.enable(false);
    this.authService.logout();
  }
}
