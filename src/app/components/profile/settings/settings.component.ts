import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { states } from '@app/constants/states.constants';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from "@app/services/shared-data.service";
import { ProfileService } from "@app/services/profile.service";
import { ApiService } from "@app/services/api.service";
import { AngularGooglePlaceService } from "@app/services/googlePlace.service";
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  tabSet: Array<String> = ['Profile Settings', 'Payment Methods'];
  profile$: Observable<any>;
  profileData: any = this.sharedDataService.get("profileData");
  states: any = new states().states;
  showPasswordField: Boolean = false;
  profileSaved: boolean = false;
  error: any = {};
  getAvatar = this.profileService.getUserAvatarSrc;
  subs = this.profileService.informProfileLoaded.subscribe((profile) => {
    this.profileData = Object.assign({}, profile.data.attributes)
  })
  public options = { type: 'address', componentRestrictions: { country: 'US' } };
  constructor(private googlePlaceService:AngularGooglePlaceService, private r: ActivatedRoute, private apiService: ApiService, private toastr: ToastrService, private profileService: ProfileService, private sharedDataService: SharedDataService) {
  }

  updateProfile() {
    this.error = {};
    this.profileService
      .updateProfile(this.profileData)
      .subscribe((result) => {
        this.onProfileUpdated()
      }, (err) => {
        console.log(err)
        this.error = err.alert;
      })
  }


  setAddress(gPlaceData) {
    this.profileData.zip_code = this.googlePlaceService.postal_code(gPlaceData)
    this.profileData.state = this.googlePlaceService.state(gPlaceData)
    this.profileData.city = this.googlePlaceService.city(gPlaceData)
    this.profileData.address = this.googlePlaceService.address(gPlaceData)
  }

  handleAddressChange(event){
    console.log(JSON.stringify(event.address_components))
    this.setAddress(event.address_components)
  }

  onProfileUpdated() {
    this.toastr.success('Your profile has beed successfuly updated', 'Success');
    this.profileService.getProfile().subscribe((res) => {
      this.showPasswordField = false;
      this.profileData = Object.assign({}, res.data.attributes)
      this.profileService.updateProfile(res.data.attributes)
      this.sharedDataService.save("profileData", res.data.attributes, true);
      this.profileService.profileUpdated(res.data.attributes);
    })
  }

  ngOnChanges() {

  }

  ngOnInit() {

  }
}
