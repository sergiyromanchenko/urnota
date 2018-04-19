import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from "@app/services/shared-data.service"
import { ProfileService } from "@app/services/profile.service"
import { ActivatedRoute, Router } from "@angular/router"
import { SigninComponent } from "@app/components/modals/signin/signin.component"
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { CustomModalService } from "@app/services/customModal.service"
@Component({
  selector: 'profile-quick-actions',
  templateUrl: './profile-quick-actions.component.html',
  styleUrls: ['./profile-quick-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileQuickActionsComponent implements OnInit {
  profile:any = {}
  getAvatar:any = this.profileService.getUserAvatarSrc;
  menuToggled:Boolean = false;
 
  constructor(private sharedDataService:SharedDataService, private modalService: NgbModal, public profileService:ProfileService, private activatedRoute:ActivatedRoute, private router:Router, private customModalService:CustomModalService) {
    
   }

  logout(){
    this.profileService.logout();
  }

  showSignin(eventData){
    if(this.activatedRoute.snapshot.routeConfig.path.indexOf("donate") < 0){
      this.router.navigate(["/signin"]);
      return;
    }
   this.customModalService.open(SigninComponent,{ windowClass: 'signin-modal  d-flex align-items-center custom-show' })
  }

  getProfile(){
    this.profile = this.sharedDataService.get("profileData") || {};
  }

  profileUpdateSubscription = this.profileService.informProfileUpdate.subscribe((value) => { 
    this.getProfile()
  });

  ngOnInit() {
    this.getProfile()
  }

}