import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAvatarComponent implements OnInit {
  @Input() avatar:String;
  @Input() uploading:Boolean;
  @Input() uploadEnabled:Boolean
  constructor(private _sanitizer: DomSanitizer,) { }

  sanitizeImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  ngOnInit() {
  }

}
