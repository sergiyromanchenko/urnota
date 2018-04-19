import { Component, OnInit } from "@angular/core";
import { SubscriptionService } from "@app/services/subscription.service";
import { Router } from "@angular/router";
import { SharedDataService } from "@app/services/shared-data.service";
@Component({
  selector: "payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  subscriptions: any;
  subscriptionsLoading: Boolean = true;
  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  subscriptionEdit(data) {
    this.sharedDataService.save("subscriptionInfo", data.attributes);
    this.router.navigate(["/profile/paymentsSubscriptions", data.id]);
  }

  ngOnInit() {
    this.subscriptionService.getSubscriptions().subscribe(res => {
      this.subscriptions = res.data;
      this.subscriptionsLoading = false;
    });
  }
}
