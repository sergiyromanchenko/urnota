import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from "@app/services/profile.service"
import { SharedDataService } from "@app/services/shared-data.service"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'
@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  signinData: any = {
    email: "",
    password: "",
    remember: true
  }
  test: any = null;
  error: any = null;

  constructor(public profileService: ProfileService, public sharedDataService: SharedDataService, public activeModalRef: NgbActiveModal, public router: Router) { }

  ngOnInit() {
  }

  submitSignin() {
    let wrap = {
      api_v1_user: this.signinData
    }
    this.profileService
      .signin(wrap)
      .subscribe((result) => {
        let storageType = !this.signinData.remember ? "sessionStorage" : null
        this.sharedDataService.save("token", result.access_token.replace("Bearer", "").trim(), true, storageType);
        this.getProfileAndProceed();
      }, (error) => {
        this.error = "Invalid email or password"
      })

  }

  goToResetPassword() {
    this.closeModal();
    this.router.navigate(["/resetPassword"]);
  }

  getProfileAndProceed() {
    this.profileService.getProfile().subscribe(res => {
      this.sharedDataService.save("profileData", res.data.attributes, true);
      this.profileService.profileUpdated(res.data.attributes);
      this.closeModal();
    });
  }

  closeModal() {
    this.activeModalRef.close();
  }
}
