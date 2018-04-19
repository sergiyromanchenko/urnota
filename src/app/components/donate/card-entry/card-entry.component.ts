import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PaymentService } from "@app/services/payment.service";
import { SharedDataService } from "@app/services/shared-data.service";
import { ProfileService } from "@app/services/profile.service";
import { Observable } from "rxjs/Observable";
import { ISubscription } from "rxjs/Subscription";
import { config } from '@app/app.config';
import { Angulartics2 } from 'angulartics2';
@Component({
  selector: "card-entry",
  templateUrl: "./card-entry.component.html",
  styleUrls: ["./card-entry.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CardEntryComponent implements OnInit {
  config: any = config;
  activeTab: number = 0;
  paymentInfo: any;
  profileData: any = {};
  paymentMethod: any = undefined;
  loading: Boolean = false
  paymentMethods: Array<any> = [];
  paymentPending: Boolean = false;
  userSeemsExisting: boolean = this.sharedDataService.get("userSeemsExisting");
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public paymentService: PaymentService,
    public sharedDataService: SharedDataService,
    public profileService: ProfileService,
    public angulartics2: Angulartics2
  ) {
   }

  cardAdded(data) {
    this.angulartics2.eventTrack.next({ 
      action: 'Submit',
      properties: { 
        category: 'Submit Donation', 
        label: 'Donate Card Entry',
      },
    });
    if (!this.profileService.isAuthenticated()) {
      this.profileService
        .auth(this.sharedDataService.get("authData"))
        .then(result => {
          
          if (result.access_token) {
            this.sharedDataService.save(
              "token",
              result.access_token.replace("Bearer", "").trim(),
              true
            );
            this.getProfileAndProceed(data)
          };
        })
    }
    else {
      this.addPaymentMethod(data);
    }
  }

  profileSub: ISubscription;
  getProfileAndProceed(nonce) {
    this.profileSub = this.profileService.getProfile().subscribe(res => {
      this.sharedDataService.save("profileData", res.data.attributes, true);
      this.profileData = res.data.attributes;
      this.addPaymentMethod(nonce);
      this.onSendPaymentSuccess();
    });
  }

  onSendPaymentSuccess(){
    this.sharedDataService.save("donatePassed", true);
    this.router.navigate(["/donate/donationDone"]);
  }

  onSendPaymentError(){
    this.router.navigate(["/donate/cardEntryError"]);
  }

  addPaymentMethod(nonce) {
    let paymentPayload = Object.assign({}, this.paymentInfo)
    paymentPayload.nonce_from_the_client = nonce;
    paymentPayload.amount = paymentPayload.totalAmount;
    if (paymentPayload.subscription == "once") {
      delete paymentPayload.subscription;
    }
    delete paymentPayload.totalAmount
    this.paymentService.sendPayment(paymentPayload).subscribe(
      result => {
        this.onSendPaymentSuccess();
      },
      err => {
        this.onSendPaymentError();
      }
    );
  }

  getPaymentMethods() {
    this.paymentService.getPaymentMethods().subscribe(res => {
      this.loading = false;
      if(res.data.length && res.data[0].attributes){
        this.paymentMethods = res.data;
      }
    });
  }

  submitPaymentMethod() {
    this.paymentPending = true;
    this.angulartics2.eventTrack.next({ 
      action: 'Submit',
      properties: { 
        category: 'Submit Donation', 
        label: 'Donate Card Entry',
      },
    });
    let paymentPayload = Object.assign({}, this.paymentInfo)
    paymentPayload.payment_method_token = this.paymentMethod;
    paymentPayload.amount = paymentPayload.totalAmount;
    if (paymentPayload.subscription == "once") {
      delete paymentPayload.subscription;
    }
    delete paymentPayload.totalAmount
    this.paymentService.sendPayment(paymentPayload).subscribe(
      result => {
        this.onSendPaymentSuccess();
      },
      err => {
        this.onSendPaymentError();
      }
    );
  }

  getCardType(card){
    return card.card_type.toLowerCase();
  }

  ngOnInit() {
    this.paymentInfo = this.sharedDataService.get("fundData") || {};
    // if (!this.paymentInfo.amount) {
    //   this.router.navigate(["/donate/partner"]);
    // }
    if (this.profileService.isAuthenticated()) {
      this.loading = true;
      this.getPaymentMethods();
      this.profileData = this.sharedDataService.get("profileData") || {};
    }
    else{
      this.profileData = this.sharedDataService.get("authData") || {};
    }
    
  }

  ngOnDestroy() {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }
}
