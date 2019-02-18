import { Component, OnInit } from "@angular/core";
import { MenuController, IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, Event, NavigationEnd } from "@angular/router";

import { DatabaseService, UserDetails } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { Util } from "./../../utils/util";
import { EmailValidator } from "./../../validators/emailValidator";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  private userDetails: UserDetails = { email: "", password: "" };

  constructor(
    private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private util: Util,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });

    this.getUserDetails();
  }

  ngOnInit() {
    this.util.hideMenu(this.menu);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === "/login") {
          this.getUserDetails();
        }
      }
    });
  }

  getUserDetails() {
    console.log("called to storage");
    this.databaseService.getUserDetails().then((data) => {
      if (data) {
        this.userDetails = data;
        this.loginForm.patchValue({ email: this.userDetails.email, password: this.userDetails.password });
      }
    });
  }

  loginUser(fab: IonFab) {
    let isLoginSuccess = true;
    let userDetails: UserDetails = { email: "", password: "" };

    // Call authentication web service here

    if (!isLoginSuccess) {
      // Alert box
      this.alertBox.customShow("Failed", "Invalid authentication", ["OK"]);

      // Loading box
      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      userDetails.email = this.loginForm.controls.email.value;
      userDetails.password = this.loginForm.controls.password.value;
      this.databaseService.saveUserDetails(userDetails);

      fab.close();
      this.util.resetForm(this.loginForm);
      this.authService.login();
      this.util.showMenu(this.menu);
    }
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]).then(res => {
      this.util.resetForm(this.loginForm);
    });
  }
}
