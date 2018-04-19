import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ProfileService } from "../services/profile.service";
@Injectable()
export class ProfileResolver implements Resolve<any> {
  /**
  * resolve() is the method we have to implement for the Resolve interface.
  * The router will call this method when the users visits the route.
  * We can return Promises, Observables or any other value here.
  * When it's a Promise or Observable, the Angular Router waits for 
  * the result and then displays the page (which is what we want).
  */

  constructor(private profileService:ProfileService){

  }
  resolve(){
    return this.profileService.getProfile()
  }
}
