import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router"
import { ProfileService } from "@app/services/profile.service";
import { SharedDataService } from "@app/services/shared-data.service";
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userInfo: any = {};
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(public profileService: ProfileService, public sharedDataService: SharedDataService, public router: Router) { }
  @ViewChild('t') public tooltip: NgbTooltip;


  goToCardEntry() {
    this.userInfo.phone = "+1" + this.userInfo.phone;
    this.sharedDataService.save("authData", this.userInfo);
    this.router.navigate(["/donate/cardEntry"]);
  }

  onUserInfoFormSubmit() {
    if (!this.profileService.isAuthenticated()) {
      this.profileService.checkEmail({ email: this.userInfo.email }).then((res) => {
        this.goToCardEntry();
      }, (err) => {
        this.showExistingUserTooltip(true);
      })
    }
    else{
      this.goToCardEntry();
    }
  }

  showExistingUserTooltip(avoidClosing) {
    const isOpen = this.tooltip.isOpen();
    if (!avoidClosing) {
      this.tooltip.close();
    }
    if (!isOpen) {
      this.tooltip.open({});
    }
  }

  ngOnInit() {
    this.userInfo = this.sharedDataService.get("authData") || this.sharedDataService.get("profileData");
    if (!this.userInfo) {
      this.userInfo = {};
    }
    if (this.userInfo.phone) {
      this.userInfo.phone = this.userInfo.phone.replace("+1", "")
    }
    this.profileService.informProfileUpdate.subscribe((data) => {
      this.userInfo = data;
    })
  }

}
