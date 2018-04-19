import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "@app/services/shared-data.service";
import { ProfileService } from "@app/services/profile.service";
import { Router } from "@angular/router"
@Component({
  selector: 'donation-done',
  templateUrl: './donation-done.component.html',
  styleUrls: ['./donation-done.component.scss']
})
export class DonationDoneComponent implements OnInit {
  profileData: any;
  paymentInfo: any;
  constructor(public sharedDataService: SharedDataService, public router: Router, public profileService: ProfileService) { }

  cleanDonateData() {
    this.sharedDataService.remove("fundData");
    this.sharedDataService.remove("authData");
    this.sharedDataService.remove("donatePassed");

  }

  onProfileFormSubmit() {
    this.profileService
      .updateProfile(this.profileData)
      .subscribe((result) => {
        this.cleanDonateData();
        this.router.navigate(["/profile"]);
      }, (err) => {
        console.log(err)
      })
  }

  ngOnInit() {
    this.paymentInfo = this.sharedDataService.get("fundData") || {};
    this.profileData = this.sharedDataService.get("profileData");
  }

}
