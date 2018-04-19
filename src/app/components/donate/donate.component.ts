import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router'
import { ProfileService } from "@app/services/profile.service";
import { SharedDataService } from "@app/services/shared-data.service";
import { isMobile } from "@app/helpers/isMobile";
@Component({
  selector: 'signup',
  templateUrl: './donate.component.html',
  host: { 'class': 'donate' },
  encapsulation: ViewEncapsulation.None
})
export class DonateComponent implements OnInit {
  profileData: any = {};
  isMobile = isMobile;
  currentRouteUrl: any;
  loginForm:any;
  constructor(public profileService: ProfileService, private sharedDataService: SharedDataService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  getStorage(prop) {
    return this.sharedDataService.get(prop)
  }

  navigateToStep(route) {
    if(this.currentRouteUrl == "/donate/donationDone") return;
    this.router.navigate(["/donate/" + route]);
  }

  ngOnInit() {
    this.profileData = this.sharedDataService.get("profileData") || {}
  
    this.router.events.subscribe((val) => {
      this.activatedRoute.snapshot
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentRouteUrl = event.url;
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized

    });
  }

}
