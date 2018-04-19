import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreditCardComponent implements OnInit {
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() actionText: String;
  @Input() cardData: any;
  @Input() inactive: any;

  constructor() { }

  getCardType(){
    return this.cardData.card_type.toLowerCase();
  }

  cardAction(){
    this.onAction.emit(true);
  }

  suggestionWasClicked(): void {
    this.onAction.emit(true);
  }

  ngOnInit() {
    this.cardData = this.cardData || {}
  }

}
