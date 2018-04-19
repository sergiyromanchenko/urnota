import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SharedDataService } from "@app/services/shared-data.service"
import { Router } from "@angular/router"
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "angular2-jwt";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/toPromise";
import { config } from '@app/app.config'

// Import RxJs required methods

@Injectable()
export class ProfileService {

  constructor(private sharedDataService: SharedDataService, private authHttp: AuthHttp, private router: Router, private http: Http) { }
  apiUrl = config.apiUrl;
  private profileInformation = new Subject<Object>();
  profileInformation$ = this.profileInformation.asObservable();
  informProfileUpdate: Subject<any> = new Subject<any>();
  informProfileLoaded: Subject<any> = new Subject<any>();

  auth(data): Promise<any> {
    return this.http
      .post(this.apiUrl + "/auth", data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  checkEmail(data): Promise<any> {
    return this.http
      .post(this.apiUrl + "/profiles/check_email", data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  signin(data): Observable<any> {
    return this.http
      .post(this.apiUrl + "/auth/sign_in", data)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

  sendPasswordReset(data): Promise<any> {
    return this.http
      .post(this.apiUrl + "/auth/password", data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updatePassword(data): Promise<any> {
    return this.http
      .put(this.apiUrl + "/auth/password", data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    error = error.json();
    return Promise.reject(error || {});
  }

  getProfile(): Observable<any> {
    return this.authHttp.get(this.apiUrl + "/profiles/my").map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

  updateProfile(data): Observable<any> {
    return this.authHttp.put(this.apiUrl + "/profiles", data).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json()));
  }

  logout() {
    this.sharedDataService.remove("token");
    this.sharedDataService.remove("authData");
    this.sharedDataService.remove("profileData");
    this.router.navigate(["/signin"]);
  }

  isAuthenticated() {
    return !!this.sharedDataService.get("token")
  }

  profileUpdated(data) {
    this.informProfileUpdate.next(data);
  }

  profileLoaded(data) {
    this.informProfileLoaded.next(data);
  }

  getUserAvatarSrc(path){
    return path ? path : "../../../assets/images/user.png"
  }

}
