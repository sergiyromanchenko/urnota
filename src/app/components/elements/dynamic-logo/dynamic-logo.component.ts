import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dynamic-logo',
  templateUrl: './dynamic-logo.component.html',
  styleUrls: ['./dynamic-logo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicLogoComponent implements OnInit {
  @Input()
  logo:String;
  
  constructor() { }

  ngOnInit() {
  }

}
