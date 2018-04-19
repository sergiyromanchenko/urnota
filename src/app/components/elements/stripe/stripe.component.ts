declare var stripe: any;
declare var elements: any;
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "stripe",
  templateUrl: "./stripe.component.html",
  styleUrls: ["./stripe.component.scss"]
})
export class StripeComponent {
  @ViewChild("cardInfo") cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  stripeValid: Boolean = false
  stripe: any;
  paymentPending: Boolean = false;
  @Input() callback: Function;
  @Input() disableSelfControl: boolean;
  @Input() sum: number;
  @Output() onCardAdded: EventEmitter<String> = new EventEmitter<String>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener("change", this.cardHandler);
      this.card.destroy();
    }
  }
  
  loadScript(callback) {
    var scriptsLoaded = 0;
    // Dynamic script list
    var dynamicScripts = [
      "https://js.stripe.com/v3/"
    ];
    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.onload = function () {

        // Increasing scripts count on each loaded iteration
        ++scriptsLoaded;
        scriptsLoaded == dynamicScripts.length && callback();
      };
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  createStripeInstance(elements) {
    let _this = this;
    const style = {
      base: {
        lineHeight: "24px",
        fontFamily: "monospace",
        fontSmoothing: "antialiased",
        fontSize: "19px",
        "::placeholder": {
          color: "b3b3b3"
        }
      }
    };
    if (elements) {
      this.card = elements.create("card", { style, hidePostalCode:true });
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', (event)=>{
        _this.stripeValid = event.complete
      });
    }
  }

  ngOnInit() {
    this.loadScript(() => {
      this.stripe = window["Stripe"]('pk_test_71jdFNxlKHI7kVXf3wGBGm0K')
      var elements = this.stripe.elements();
      this.createStripeInstance(elements);
    })
  }

  async onSubmit() {
    this.paymentPending = true;
    this.card.amount = 77;
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      this.onCardAdded.emit(error);
    } else {
      this.onCardAdded.emit(token.id);
    }
  }
}
