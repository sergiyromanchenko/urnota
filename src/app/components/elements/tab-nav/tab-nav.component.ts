import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabNavComponent implements OnInit {
  activeTabIndex = 0;

  @Input()
  tabs:Array<String>

  @Input()
  get activeTab() {
    return this.activeTabIndex;
  }

  

  @Output() activeTabChange = new EventEmitter();
  
    set activeTab(val) {
      this.activeTabIndex = val;
      this.activeTabChange.emit(this.activeTabIndex);
    }


  constructor() { }

  selectTab(index){
    this.activeTab = index;
  }

  ngOnInit() {
  }

}
