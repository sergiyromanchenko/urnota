import { Injectable } from '@angular/core';
import { Response} from "@angular/http";
import { config } from '../app.config';
import { AuthHttp } from "angular2-jwt";
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class DashboardService {
  apiUrl = config.apiUrl;
  constructor(private authHttp: AuthHttp) { }

  getCampaigns(){
    return this.authHttp.get(this.apiUrl + "/dashboard/subscriptions").map((res:Response) => res.json());
  }
  
  getOverview(){
    return this.authHttp.get(this.apiUrl + "/dashboard/overview").map((res:Response) => res.json());
  }

  getDonations(){
    return this.authHttp.get(this.apiUrl + "/dashboard/donations").map((res:Response) => res.json());
  }

}


