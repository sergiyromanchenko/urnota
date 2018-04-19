import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ProfileService } from "@app/services/profile.service";
import { SharedDataService } from "@app/services/shared-data.service"
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  restoreData:any = {}
  email:String = "";
  emailConfirmationSent:Boolean = false;
  passwordUpdateProcess:Boolean = false;
  updatePasswordData: any = {};
  error:any = {};
  resetToken = this.route.snapshot.queryParams["reset_password_token"] || null;
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private sharedDataService:SharedDataService, private router:Router) { }

  checkRestoreEmail(){
    this.profileService.sendPasswordReset({email:this.email}).then((res)=>{
      this.emailConfirmationSent = true;
    }).catch(error => {
      console.log(error)
      this.error = error.alert
    });
  }

  updatePassword(){
    this.updatePasswordData.reset_password_token = this.resetToken
    this.profileService.updatePassword(this.updatePasswordData).then((result)=>{
      this.sharedDataService.save("token", result.access_token.replace("Bearer", "").trim(), true);
        this.router.navigate(["/profile/settings"]);
    }, (err)=>{
      this.error = err.alert
    })
  }

  resetError(){
    this.error = {};
  }

 
  ngOnInit() {
    if(this.resetToken){
      this.passwordUpdateProcess = true
    }
  }

}
