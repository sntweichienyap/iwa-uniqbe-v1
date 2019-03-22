import { Component, OnInit } from "@angular/core";
import { Router, Event, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonFab } from "@ionic/angular";

import { GlobalVariableService } from "./../../services/global.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import {
  IStockUploadDetailsRequest,
  IStockUploadUpdateRequest
} from "./../../models/stock-upload.model";
import { IDdlResult } from "./../../models/ddl.model";
import { Util } from "./../../utils/util";
import { DdlService } from "./../../services/ddl.service";
import { Environment } from "./../../utils/environment";

@Component({
  selector: "app-stock-upload-edit-details",
  templateUrl: "./stock-upload-edit-details.page.html",
  styleUrls: ["./stock-upload-edit-details.page.scss"]
})
export class StockUploadEditDetailsPage implements OnInit {
  centerList: IDdlResult;
  updateForm: FormGroup;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  stockUploadID: number;
  todayDT = new Date();
  dateFormat = Environment.DATE_FORMAT;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalVariableService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private ddlService: DdlService,
    private utils: Util
  ) {
    this.updateForm = formBuilder.group({
      stockUploadID: 0,
      centerID: 0,
      doNo: "",
      hasPO: false,
      poNo: { value: "", disabled: true },
      awbNo: "",
      subject: "",
      receiveDT: new Date(
        this.todayDT.getFullYear(),
        this.todayDT.getMonth(),
        this.todayDT.getDate(),
        this.todayDT.getHours()
      ).toISOString(),
      remark: ""
    });
  }

  ngOnInit() {
    this.getCenterList();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url == "/stock-upload-edit-details"
        ) {
          this.getCenterList();
        }
      }
    );

    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");

      this.getStockUploadDetails();
    });

    this.onUpdateFormChange();
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private getStockUploadDetails() {
    let request: IStockUploadDetailsRequest = {
      StockUploadID: this.stockUploadID,
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadDetails(request).subscribe(
        data => {
          this.loaderBox.dismiss();
          let hasPO = data.PONo ? true : false;

          if (data.ResponseCode.isApiSuccess()) {
            this.updateForm.patchValue({
              stockUploadID: data.StockUploadID,
              centerID: data.CenterID,
              doNo: data.DONo,
              poNo: { value: data.PONo, disabled: !hasPO },
              awbNo: data.AWBNumber,
              subject: data.Subject,
              receiveDT: new Date(data.ReceiveDT).toISOString(),
              remark: data.Remark,
              hasPO: hasPO
            });
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

  onUpdate(fab: IonFab) {
    let receiveDT: Date = this.updateForm.controls.receiveDT.value;
    let dotNetReceiveDate = receiveDT.toString().convertToDotNetJSONDate();
    let request: IStockUploadUpdateRequest = {
      StockUploadID: this.updateForm.controls.stockUploadID.value,
      AWBNumber: this.updateForm.controls.awbNo.value,
      CenterID: this.updateForm.controls.centerID.value,
      DONo: this.updateForm.controls.doNo.value,
      PONo: this.updateForm.controls.poNo.value,
      Subject: this.updateForm.controls.subject.value,
      ReceivedDT: dotNetReceiveDate,
      Remark: this.updateForm.controls.remark.value,
      AccessID: this.globalService.getAccessID()
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadUpdate(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            fab.close();
            this.utils.resetForm(this.updateForm);
            this.router.navigateByUrl(
              `/stock-upload-details/${this.stockUploadID}`
            );
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

  private onUpdateFormChange() {
    this.updateForm.get("hasPO").valueChanges.subscribe(val => {
      if (val) {
        this.updateForm.controls["poNo"].enable();
      } else {
        this.updateForm.controls["poNo"].disable();
        this.updateForm.patchValue({ poNo: "" });
      }
    });
  }

  scanDONo() {
    console.log("scan DO");
  }

  scanPONo() {
    console.log("scan PO");
  }

  scanAWBNo() {
    console.log("scan AWB");
  }

  private getCenterList() {
    this.centerList = this.ddlService.getCenter_Wh();
  }
}
