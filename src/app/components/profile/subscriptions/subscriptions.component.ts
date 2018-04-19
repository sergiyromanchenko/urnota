import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService} from "@app/services/api.service";

@Component({
  selector: "subscriptions",
  templateUrl: "./subscriptions.component.html",
  styleUrls: ["./subscriptions.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: any = [];
  constructor(private _sanitizer: DomSanitizer, private apiService:ApiService) {}

  getFundPercent(total, value) {
    let percent = value * 100 / total;
    return percent.toFixed();
  }

  getMinistries(){
    this.apiService.getMyMinistries().subscribe((res)=>{
      this.subscriptions = res.data
    })
  }

  sanitizeImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  ngOnInit() {
    this.getMinistries();
  }
}
