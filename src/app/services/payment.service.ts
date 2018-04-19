import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { AuthHttp } from "angular2-jwt";
import { Observable } from "rxjs/Observable";
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { config } from '../app.config';

@Injectable()
export class PaymentService {
  apiUrl = config.apiUrl;
  constructor(private http: Http, private authHttp: AuthHttp) { }

  sendPayment(data): Observable<any> {
    return this.authHttp.post(this.apiUrl + "/" + config.payment_provider + "/payment_handler", data);
  }

  getPaymentMethods(provider?:string): Observable<any> {
    let providerType = provider ? provider : config.payment_provider;
    return this.authHttp.get(this.apiUrl + "/" + providerType + "/cards").map((res:Response) => res.json());
  }

  updatePaymentMethod(data, token): Observable<any> {
    return this.authHttp.put(this.apiUrl + "/" + config.payment_provider + "/cards/" + token, data).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json()));
  }
  
  deletePaymentMethod(token, provider){
    return this.authHttp.delete(this.apiUrl + "/" + provider + "/cards/" + token).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json()));
  }

  createPaymentMethod(data){
    return this.authHttp.post(this.apiUrl + "/" + config.payment_provider + "/cards/", data).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json()));
  }

}
