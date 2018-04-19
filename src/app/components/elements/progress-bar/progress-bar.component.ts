import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input()
  value = 0;

  @Input()
  max = 100;

  @Input()
  height:number;

  getProgress() {
      if (this.max === 0)
          return 0;

      return this.value / this.max * 100;
  }

  getBorderRadius(){
    return this.height / 2
  }

  getHeight(){
    return this.height ? this.height : "10px"
  }

  constructor() { }

  ngOnInit() {
  }

}
