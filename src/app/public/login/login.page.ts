import { Component, OnInit } from "@angular/core";
import { MenuController, IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, Event, NavigationEnd } from "@angular/router";

import { DatabaseService } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { Util } from "./../../utils/util";
import { EmailValidator } from "./../../validators/emailValidator";
import { ApiService } from "./../../services/api.service";
import { IUserDetailsStorage } from "../../models/local-storage.model";
import "./../../utils/extension-method";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private utils: Util,
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
    this.utils.hideMenu(this.menu);

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
          email: data.Email,
          password: data.Password
        });
      }
    });
  }

  loginUser(fab: IonFab) {
    let request = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    let userDetailsStorage = {} as IUserDetailsStorage;

    this.loaderBox.present().then(() => {
      this.apiService.login(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            userDetailsStorage.Email = data.Username;
            userDetailsStorage.Password = request.password;
            userDetailsStorage.Name = data.Name;
            userDetailsStorage.CenterID = data.CenterID;
            userDetailsStorage.CenterName = data.CenterName;
            userDetailsStorage.CenterTypeCode = data.CenterTypeCode;
            userDetailsStorage.AccessID = data.AccessID;

            this.databaseService.saveUserDetails(userDetailsStorage);

            fab.close();
            this.utils.resetForm(this.loginForm);
            this.authService.login();
            this.utils.showMenu(this.menu);
          } else {
            this.alertBox.apiFailShow(
              data.ResponseMessage
            );
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
      this.utils.resetForm(this.loginForm);
    });
  }
}
