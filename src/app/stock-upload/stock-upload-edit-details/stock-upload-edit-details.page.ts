import { Component, OnInit } from "@angular/core";
import { Router, Event, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonFab } from "@ionic/angular";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { IStockUploadDetailsRequest } from "./../../models/stock-upload.model";
import { IDdlResult } from "./../../models/ddl.model";
import { Util } from "./../../utils/util";
import { DdlService } from "./../../services/ddl.service";

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private ddlService: DdlService
  ) {
    this.updateForm = formBuilder.group({
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
      AccessID: this.databaseService.getUserDetails().AccessID
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadDetails(request).subscribe(
        data => {
          this.loaderBox.dismiss();
          let hasPO = data.PONo.isEmpty() ? false : true;

          console.log(data.ReceiveDT);
          if (data.ResponseCode.isApiSuccess()) {
            this.updateForm.patchValue({
              stockUploadID: data.StockUploadID,
              centerID: data.CenterID,
              doNo: data.DONo,
              poNo: { value: data.PONo, disabled: !hasPO },
              awbNo: data.AWBNumber,
              subject: data.Subject,
              receiveDT: data.ReceiveDT,
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
    console.log(this.updateForm.controls.stockUploadID.value);
    console.log(this.updateForm.controls.centerID.value);
    console.log(this.updateForm.controls.doNo.value);
    console.log(this.updateForm.controls.poNo.value);
    console.log(this.updateForm.controls.awbNo.value);
    console.log(this.updateForm.controls.subject.value);
    console.log(this.updateForm.controls.receiveDT.value);
    console.log(this.updateForm.controls.remark.value);

    //this.router.navigateByUrl(`/stock-upload-details/${this.stockUploadID}`);
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
