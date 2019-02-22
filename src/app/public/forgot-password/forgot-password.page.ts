import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { EmailValidator } from "./../../validators/emailValidator";
import { ApiService } from "./../../services/api.service";
import { Util } from "./../../utils/util";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private utils: Util
  ) {
    this.forgotPasswordForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  ngOnInit() {}

  forgotPassword() {
    this.loaderBox.present().then(() => {
      let request = { email: this.forgotPasswordForm.controls.email.value };
      this.apiService.forgotPassword(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (this.utils.isApiSuccess(data.ResponseCode)) {
            this.utils.resetForm(this.forgotPasswordForm);

            this.alertBox.apiSuccessShow(
              "Password reset success. Please check your email."
            );
          } else {
            this.alertBox.apiFailShow(data.Response.Message);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }
}
