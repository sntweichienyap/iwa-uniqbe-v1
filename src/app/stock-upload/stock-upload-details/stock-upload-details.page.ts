import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { IStockUploadDetailsRequest } from "./../../models/stock-upload.model";

@Component({
  selector: "app-stock-upload-details",
  templateUrl: "./stock-upload-details.page.html",
  styleUrls: ["./stock-upload-details.page.scss"]
})
export class StockUploadDetailsPage implements OnInit, OnDestroy {
  isVisible = true;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  stockUploadID: number;
  stockUploadDetails = {
    stockUploadID: 0,
    center: "",
    doNo: "",
    poNo: "",
    awbNo: "",
    subject: "",
    receiveDT: "",
    remark: "",
    status: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");

      this.getStockUploadDetails();
    });
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

          if (data.ResponseCode.isApiSuccess()) {
            this.stockUploadDetails.stockUploadID = data.StockUploadID;
            this.stockUploadDetails.center = data.CenterName;
            this.stockUploadDetails.doNo = data.DONo;
            this.stockUploadDetails.poNo = data.PONo;
            this.stockUploadDetails.awbNo = data.AWBNumber;
            this.stockUploadDetails.subject = data.Subject;
            this.stockUploadDetails.receiveDT = data.ReceiveDT;
            this.stockUploadDetails.remark = data.Remark;
            this.stockUploadDetails.status = data.Status;
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

  update() {
    this.router.navigateByUrl(`/stock-upload-edit-details/${this.stockUploadID}`);
  }

  createItem() {
    this.router.navigateByUrl("/stock-upload-create-item");
  }

  viewItem() {
    this.router.navigateByUrl("/stock-upload-item-details");
  }

  toggleInfoList() {
    this.isVisible = !this.isVisible;
  }
}
