import { Component, OnInit } from "@angular/core";
import { MenuController, IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, Event, NavigationEnd } from "@angular/router";

import { DatabaseService } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { Util } from "./../../utils/util";
import { Environment } from "./../../utils/environment";
import { EmailValidator } from "./../../validators/emailValidator";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginResponse: any = {};

  constructor(
    private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private apiService: ApiService,
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

  private getUserDetails() {
    this.databaseService.getUserDetails().then(data => {
      if (data) {
        this.loginForm.patchValue({
          email: data.email,
          password: data.password
        });
      }
    });
  }

  loginUser(fab: IonFab) {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    let userDetails = { email: "", password: "", accessID: 0 };

    this.loaderBox.present().then(() => {
      this.apiService.login(email, password).subscribe(
        data => {
          this.loaderBox.dismiss();

          //if (data.ResponseCode === Environment.API_FLAG_SUCCESS) {
          if (true) {
            userDetails.email = email;
            userDetails.password = password;
            //userDetails.accessID = data.AccessID;

            this.databaseService.saveUserDetails(userDetails);

            fab.close();
            this.util.resetForm(this.loginForm);
            this.authService.login();
            this.util.showMenu(this.menu);
          } else {
            this.alertBox.customShow("Failed", "Invalid authentication", [
              "OK"
            ]);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]).then(res => {
      this.util.resetForm(this.loginForm);
    });
  }
}
