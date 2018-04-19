import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from "../../services/shared-data.service";
import { ProfileService } from "@app/services/profile.service"
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  signinData:any = {
    email:"",
    password:"",
    remember:true
  }
  error:any = null;
  constructor(private sharedDataService:SharedDataService, private profileService:ProfileService, private router:Router) { }

  signin(){
    let wrap = {
      api_v1_user: this.signinData
    }
    this.profileService
      .signin(wrap)
      .subscribe((result) => {
        let storageType = !this.signinData.remember ? "sessionStorage" : null
        this.sharedDataService.save("token", result.access_token.replace("Bearer", "").trim(), true, storageType);
        this.router.navigate(["/profile/settings"]);
      },(error) => {
        this.error = "Invalid email or password"
      })
    
  }

  getPro

  ngOnInit() {
    console.log(this.sharedDataService.get("token"))
    if(this.sharedDataService.get("token")) this.router.navigate(["/profile/settings"]);
  }

}
