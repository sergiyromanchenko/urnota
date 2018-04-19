import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from "@app/services/shared-data.service";
import { ProfileService } from "@app/services/profile.service";
import { Uploader } from '@app/lib/angular2-http-file-upload';
import { AvatarItem } from '@app/lib/angular2-http-file-upload/avatar-upload-item';
import { config } from '@app/app.config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  interests:Array<any> = [{
    name:"Flame of Fire",
    link:"/ministry/ffm/about"
  }]
  profile:any = {};
  menuCollapsed:Boolean = false;
  profileTabSegmentActive: Boolean = null;
  avatarUploadInprogress: Boolean = false;
  constructor(private router:Router, private r:ActivatedRoute, private profileService:ProfileService, private toastr: ToastrService, private sharedDataService:SharedDataService, public uploaderService: Uploader) {
    this.sharedDataService.save("profileData", this.profile, true);
   }

   logout(){
     this.profileService.logout();
   }

   changeAvatar() {
    this.avatarUploadInprogress = true
    let uploadFile = (<HTMLInputElement>window.document.getElementById('avatarField')).files[0];
    let uploadAvatarItem = new AvatarItem(uploadFile);
    uploadAvatarItem.url = config.apiUrl + "/profiles";
    uploadAvatarItem.method = "PATCH";
    uploadAvatarItem.headers = { "access-token": "Bearer " + this.sharedDataService.get("token") };
    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
         this.onProfileUpdated();
         this.avatarUploadInprogress = false
    };
    this.uploaderService.onErrorUpload = (item, response, status, headers) => {
      this.toastr.success('There was an error updating your profile', 'Error');
    };
    this.uploaderService.upload(uploadAvatarItem);
  }


  onProfileUpdated(){
    this.toastr.success('Your profile has beed successfuly updated', 'Success');
    this.profileService.getProfile().subscribe((res) => {
      this.profile = Object.assign({}, res.data.attributes)
      this.sharedDataService.save("profileData", res.data.attributes, true);
    })
  }

  routeChangeListener(){
    this.router.events.subscribe((val) => {
      this.profileTabSegmentActive = this.r.snapshot.children[0].data.profileTabSegment
    });
  }

  checkProfileTabActive(){
    if(this.profileTabSegmentActive == null){
      this.profileTabSegmentActive = this.r.snapshot.children[0].data.profileTabSegment;
    }
    return this.profileTabSegmentActive
  }

  getProfile(){
    this.profileService.getProfile().subscribe((res)=>{
      this.profile = res.data.attributes;
      this.sharedDataService.save("profileData", res.data.attributes, true);
      this.profileService.profileLoaded(res);
    })
  }

  ngOnInit() {
    this.profileService.informProfileUpdate.subscribe((data)=>{
      this.profile = data
    })
    this.routeChangeListener();
    this.getProfile();
  }

}
