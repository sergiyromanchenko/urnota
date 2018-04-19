import { Injectable } from '@angular/core';
import { Response} from "@angular/http";
import { config } from '../app.config';
import { AuthHttp } from "angular2-jwt";
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class SubscriptionService {
  apiUrl = config.apiUrl;
  constructor(private authHttp: AuthHttp) { }

  getSubscriptions(){
    return this.authHttp.get(this.apiUrl + "/subscriptions").map((res:Response) => res.json());
  }

  cancelSubscription(id){
    return this.authHttp.delete(this.apiUrl + "/subscriptions/" + id).map((res:Response) => res.json());
  }

  getSubscriptionDetails(id){
    return this.authHttp.get(this.apiUrl + "/subscriptions/" + id).map((res:Response) => res.json());
  }

  getSubscriptionTransactions(id){
    return this.authHttp.get(this.apiUrl + "/subscriptions/" + id + "/transactions").map((res:Response) => res.json());
  }

}
