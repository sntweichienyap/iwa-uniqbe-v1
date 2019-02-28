import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {IonFab} from "@ionic/angular";

import { DdlService } from "./../../services/ddl.service";
import { IDdlResult } from "./../../models/ddl.model";
import { IStockUploadCreateRequest } from "./../../models/stock-upload.model";
import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { Util } from "./../../utils/util";

@Component({
  selector: "app-stock-upload-create",
  templateUrl: "./stock-upload-create.page.html",
  styleUrls: ["./stock-upload-create.page.scss"]
})
export class StockUploadCreatePage implements OnInit, OnDestroy {
  centerList: IDdlResult;
  navigationSubscription: Subscription;
  createForm: FormGroup;
  todayDT = new Date();

  constructor(
    private router: Router,
    private ddlService: DdlService,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private utils: Util,
  ) {
    this.createForm = formBuilder.group({
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
          event.url == "/stock-upload-create"
        ) {
          this.getCenterList();
        }
      }
    );

    this.onCreateFormChange();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private onCreateFormChange() {
    this.createForm.get("hasPO").valueChanges.subscribe(val => {
      if (val) {
        this.createForm.controls["poNo"].enable();
      } else {
        this.createForm.controls["poNo"].disable();
        this.createForm.patchValue({ poNo: "" });
      }
    });
  }

  private getCenterList() {
    this.centerList = this.ddlService.getCenter_Wh();
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

  create(fab: IonFab) {
    let receiveDT: Date = this.createForm.controls.receiveDT.value;
    let dotNetReceiveDate = receiveDT.toString().convertToDotNetJSONDate();
    let request: IStockUploadCreateRequest = {
      AWBNumber: this.createForm.controls.awbNo.value,
      CenterID: this.createForm.controls.centerID.value,
      DONo: this.createForm.controls.doNo.value,
      PONo: this.createForm.controls.poNo.value,
      Subject: this.createForm.controls.subject.value,
      ReceivedDT: dotNetReceiveDate,
      Remark: this.createForm.controls.remark.value,
      AccessID: this.databaseService.getUserDetails().AccessID,
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadCreate(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {       
            fab.close();
            this.utils.resetForm(this.createForm);
            this.router.navigateByUrl(`/stock-upload-details/${data.StockUploadID}`);
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
