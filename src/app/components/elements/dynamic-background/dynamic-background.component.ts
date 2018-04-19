import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dynamic-background',
  templateUrl: './dynamic-background.component.html',
  styleUrls: ['./dynamic-background.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicBackgroundComponent implements OnInit {
  @Input()
  bg:String;

  constructor() { }

  ngOnInit() {
  }

}
