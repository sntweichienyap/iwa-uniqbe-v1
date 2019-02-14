import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private menu: MenuController,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [""],
      password: [""]
    });
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  loginUser() {
    let isLoginSuccess = true;

    // Call authentication web service here

    if (!isLoginSuccess) {
      // Alert box
      this.alertBox.show("Failed", "Test", ["OK"]);

      // Loading box
      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      this.menu.enable(true);

      this.loginForm.reset();
      
      this.authService.login();
    }
  }
}
