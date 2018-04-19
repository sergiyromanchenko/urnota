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
export class ApiService {
  apiUrl = config.apiUrl;
  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  getMyMinistries(): Observable<any> {
    return this.authHttp.get(this.apiUrl + "/my_ministries").map((res:Response) => res.json())
    .catch((error:any) => Observable.throw('Server error'));
  }

  getMinistryDetails(id): Observable<any> {
    return this.authHttp.get(this.apiUrl + "/my_ministries/" + id).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw('Server error'));
  }





}
