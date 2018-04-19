import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../../modals/signin/signin.component';
import { ProfileService } from "@app/services/profile.service"
import { SharedDataService } from "@app/services/shared-data.service"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'
@Component({
  selector: 'sidebar-signin',
  templateUrl: './sidebar-signin.component.html',
  styleUrls: ['./sidebar-signin.component.scss']
})
export class SidebarSigninComponent extends SigninComponent {
  signInShown:Boolean = false;
  constructor(public profileService: ProfileService, public sharedDataService: SharedDataService, public activeModalRef: NgbActiveModal, public router: Router) {
    super(profileService, sharedDataService, activeModalRef, router)
   }


}
