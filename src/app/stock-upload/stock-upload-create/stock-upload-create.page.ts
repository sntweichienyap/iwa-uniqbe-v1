import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DdlService } from "./../../services/ddl.service";
import { IDdlResult } from "./../../models/ddl.model";
import { Subscription } from "rxjs";

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
    private formBuilder: FormBuilder
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

  onCreateFormChange() {
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

  create() {
    console.log(this.createForm.controls.centerID.value);
    console.log(this.createForm.controls.doNo.value);
    console.log(this.createForm.controls.hasPO.value);
    console.log(this.createForm.controls.poNo.value);
    console.log(this.createForm.controls.awbNo.value);
    console.log(this.createForm.controls.subject.value);
    console.log(this.createForm.controls.receiveDT.value);
    console.log(this.createForm.controls.remark.value);

    //this.router.navigateByUrl("/stock-upload-details");
  }
}
