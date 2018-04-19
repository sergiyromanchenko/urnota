import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubscriptionService } from "@app/services/subscription.service";
import { SharedDataService } from "@app/services/shared-data.service";
import { CustomModalService } from "@app/services/customModal.service";
import { Location } from "@angular/common";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "payments-edit",
  templateUrl: "./payments-edit.component.html",
  styleUrls: ["./payments-edit.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsEditComponent implements OnInit {
  closeResult: string;
  id: number;
  loading: Boolean = true;
  private sub: any;
  subscriptionDetails: any = {};
  subscriptionTransactions: any = [];
  subscriptionInfo: any = this.sharedDataService.get("subscriptionInfo");
  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private _location: Location,
    private modalService: NgbModal,
    private customModalService:CustomModalService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"]; // (+) converts string 'id' to a number
      this.getSubscriptionDetails();
    });
  }

  getSubscriptionDetails(){
    this.subscriptionService.getSubscriptionDetails(this.id).subscribe(res => {
      this.subscriptionDetails = res.data.attributes;
      this.getSubscriptionTransactions();
    });
  }

  getSubscriptionTransactions(){
    this.subscriptionService.getSubscriptionTransactions(this.id).subscribe((res)=>{
      this.subscriptionTransactions = res.data;
      this.loading = false;
    })
  }

  open(content) {
    this.customModalService.open(content, { windowClass: 'custom-signin custom-show' }).result.then((result) => {
      this.cancelSubscription()
    }, (reason) => {

    });
  }

  cancelSubscription(){
    this.subscriptionService.cancelSubscription(this.id).subscribe((res)=>{
      this.getSubscriptionDetails()
    },(err)=>{
    })
  }

  getTransactionsSum(){
    let total = 0;
    this.subscriptionTransactions.forEach(element => {
      total += parseInt(element.attributes.amount)
    });
    return total
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
