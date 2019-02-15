import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { EmailValidator } from "./../../validators/emailValidator";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  submitAttempt: boolean = false;
  isForgotPasswordSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertBox: Alert,
    private loaderBox: Loader
  ) {
    this.forgotPasswordForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  ngOnInit(): void {}

  forgotPassword() {
    this.submitAttempt = true;
    this.isForgotPasswordSuccess = false;

    if (!this.forgotPasswordForm.valid) {
      return;
    }

    // Call authentication web service here

    if (!this.isForgotPasswordSuccess) {
      // Alert box
      this.alertBox.apiFailShow();

      // Loading box
      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      this.alertBox.apiSuccessShow();
    }
  }
}
