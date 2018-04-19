import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from "@app/services/shared-data.service";
import { states } from '@app/constants/states.constants';
import { ProfileService } from "@app/services/profile.service";
import { Uploader } from '@app/lib/angular2-http-file-upload';
import { AvatarItem } from '@app/lib/angular2-http-file-upload/avatar-upload-item';
import { config } from '@app/app.config';
import { AngularGooglePlaceService } from "@app/services/googlePlace.service";
@Component({
  selector: 'complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  userData: any = {};
  paymentInfo: any;
  states: any = new states().states;
  steps: Array<Number> = [1,2,3]
  activeStep: number = 2;
  getAvatar = this.profileService.getUserAvatarSrc;
  access_token = this.route.snapshot.queryParams["access_token"] || null
  public options = { type: 'address', componentRestrictions: { country: 'US' } };
  constructor(public googlePlaceService:AngularGooglePlaceService, public route: ActivatedRoute, public sharedDataService: SharedDataService, public profileService: ProfileService, public router: Router, public uploaderService: Uploader) { }

  onProfileFormSubmit() {
    this.profileService
      .updateProfile(this.userData)
      .subscribe((result) => {
        this.router.navigate(["/ministry/ffm/about"]);
      }, (err) => {
        console.log(err)
      })
  }

  activateStep(step){
    if(step === 1) return;
    if(step > this.activeStep) return;
    this.activeStep = step
  }

  setAddress(gPlaceData) {
    this.userData.zip_code = this.googlePlaceService.postal_code(gPlaceData)
    this.userData.state = this.googlePlaceService.state(gPlaceData)
    this.userData.city = this.googlePlaceService.city(gPlaceData)
    this.userData.address = this.googlePlaceService.address(gPlaceData)
  }

  handleAddressChange(event){
    this.setAddress(event.address_components)
  }

  onPhotoUploaded() {
    this.profileService.getProfile().subscribe((res) => {
      this.userData = Object.assign({}, res.data.attributes)
      this.profileService.updateProfile(res.data.attributes)
    })
  }

  getProfile() {
    this.profileService.getProfile().subscribe((res) => {
      this.userData = Object.assign({}, res.data.attributes)
    })
  }

  changeAvatar() {
    let uploadFile = (<HTMLInputElement>window.document.getElementById('avatarField')).files[0];
    let uploadAvatarItem = new AvatarItem(uploadFile);
    uploadAvatarItem.url = config.apiUrl + "/profiles";
    uploadAvatarItem.method = "PATCH";
    uploadAvatarItem.headers = { "access-token": "Bearer " + this.sharedDataService.get("token") };
    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
      this.onPhotoUploaded()
    };
    this.uploaderService.upload(uploadAvatarItem);
  }

  ngOnInit() {
    this.paymentInfo = this.sharedDataService.get("fundData") || {};
    if (this.access_token) {
      this.sharedDataService.save("token", this.access_token.replace("Bearer", "").trim(), true);
    }
    this.getProfile();
  }
}
