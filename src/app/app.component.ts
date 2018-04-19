import { Component, ChangeDetectorRef } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ProfileService } from "@app/services/profile.service";
import { isMobile } from "@app/helpers/isMobile"
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { config } from '@app/app.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  device: any = undefined;
  config: Object = {
    scrollIndicators: true
  }
  constructor(private router: Router, private profileService: ProfileService, private cdRef: ChangeDetectorRef,angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }
  isMobile = isMobile;
  ngOnInit() {
    if (this.profileService.isAuthenticated() && !tokenNotExpired()) {
      this.router.navigate(["/signin"])
      localStorage.clear();
    }
    window["ga"]('create', config.analytics_key, 'none');
  }
  
}
