import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from "@app/services/shared-data.service";
import { PaymentService } from "@app/services/payment.service";
import { StripeComponent } from "@app/components/elements/stripe/stripe.component"
@Component({
  selector: 'payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.scss']
})
export class PaymentMethodEditComponent implements OnInit {
  @ViewChild(StripeComponent) child: StripeComponent;
  method: any = this.sharedDataService.get("methodEditData").method || null;
  type: any = this.sharedDataService.get("methodEditData").type;
  paymentMethods: any = [];
  expiration_date: any;
  actionLoading: Boolean = false;
  subscriptions: Array<any> = []
  constructor(private activeModalRef: NgbActiveModal, private sharedDataService: SharedDataService, private paymentService: PaymentService) { }
  getCardType() {
    return this.method.attributes.card_type.toLowerCase();
  }

  addCard() {
    this.actionLoading = true;
    this.child.onSubmit();
  }

  selectMethod() {
    alert("Should update")
  }

  deleteMethod() {
    this.actionLoading = true;
    this.paymentService.deletePaymentMethod(this.method.attributes.token, this.method.attributes.provider).subscribe((res) => {
      this.c(res)
    }, (err) => {
      this.d(err)
    })
  }

  updatePaymentMethod() {
    this.actionLoading = true;
    let payload = {
      exp_month: this.expiration_date.split("/")[0].trim(),
      exp_year: this.expiration_date.split("/")[1].trim(),
    }
    this.paymentService.updatePaymentMethod(payload, this.method.attributes.token).subscribe((res) => {
      this.c(res)
    }, (err) => {
      this.d(err)
    })
  }

  cardAdded(data) {
    this.actionLoading = true;
    this.paymentService.createPaymentMethod({ token: data }).subscribe((res) => {
      this.c(res)
    }, (err) => {

      this.d(err)
    })
  }

  d(data?: any) {
    this.activeModalRef.dismiss(data || null);
  }

  c(data?: any) {
    this.activeModalRef.close(data || null)
  }

  ngOnInit() {
    if (this.method) {
      let splitExp = this.method.attributes.expiration.split("-");
      this.expiration_date = splitExp[0] + "/" + splitExp[1].slice(-2);
    }
  }

}
