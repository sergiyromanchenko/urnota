import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from "@app/services/shared-data.service"
import { Router } from "@angular/router"
@Component({
  selector: 'card-entry-error',
  templateUrl: './card-entry-error.component.html',
  styleUrls: ['./card-entry-error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardEntryErrorComponent implements OnInit {
  fundData = this.sharedDataService.get("fundData") || {};
  constructor(private sharedDataService:SharedDataService, private router:Router) { }

  ngOnInit() {
    // if(!this.fundData.totalAmount){
    //   this.router.navigate(["/donate/partner"])
    // }
  }

}
