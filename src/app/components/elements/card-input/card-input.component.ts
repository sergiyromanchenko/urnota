import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter} from "@angular/core";

import { Injectable } from "@angular/core";
import { config } from '@app/app.config';
@Component({
  selector: "card-input",
  templateUrl: "./card-input.component.html",
  styleUrls: ["./card-input.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CardInputComponent implements OnInit {
  // Input params
  @Input() callback: Function;
  @Input() sum: number;
  @Output() onCardAdded: EventEmitter<String> = new EventEmitter<String>();
  @Output() onReady: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    this.loadScript(() => {
      this.createBraintree(window, this.onCardAdded);
    });
  }

  submit(){
    var elem = <HTMLFormElement>document.getElementById('cardSubmit');
    elem.click();
  }

  loadScript(callback) {
    var scriptsLoaded = 0;
    // Dynamic script list
    var dynamicScripts = [
      "https://js.braintreegateway.com/web/3.26.0/js/client.min.js",
      "https://js.braintreegateway.com/web/3.26.0/js/hosted-fields.min.js"
    ];
    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.onload = function() {
        // Increasing scripts count on each loaded iteration
        ++scriptsLoaded;
        scriptsLoaded == dynamicScripts.length && callback();
      };
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  
  toggleSubmitState() {
    document.getElementById("cardSubmit")["disabled"] = true;
      document.getElementById("submitLoader")["style"].display = "inline-block";
      document.getElementById("cardSubmitText")["style"].display = "none";
  }

  createBraintree(windowRef, onCardAdded) {
    var form = document.querySelector("#cardForm");
    var window = windowRef;
    var toggleSubmitState = this.toggleSubmitState;
    window.braintree.client.create(
      {
        authorization: config.braintree_key
      },
      function(clientErr, clientInstance) {
        if (clientErr) {
          console.error(clientErr);
          return;
        }
        window.braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: {
                "font-size": "16px"
              },
              "input.invalid": {
                color: "red"
              },
              "input.valid": {
                color: "green"
              },
              "::-webkit-input-placeholder": {
                color: "#b3b3b3"
              },
              ":-moz-placeholder": {
                color: "#b3b3b3"
              },
              "::-moz-placeholder": {
                color: "#b3b3b3"
              },
              ":-ms-input-placeholder": {
                color: "#b3b3b3"
              }
            },
            fields: {
              number: {
                selector: "#card-number",
                placeholder: "Card number"
              },
              cvv: {
                selector: "#cvv",
                placeholder: "CVC"
              },
              expirationDate: {
                selector: "#expiration-date",
                placeholder: "Expiration Date"
              }
            }
          },
          function(hostedFieldsErr, hostedFieldsInstance) {
            if (hostedFieldsErr) {
              return;
            }

            form.addEventListener(
              "submit",
              function(event) {
                event.preventDefault();
                toggleSubmitState();
                hostedFieldsInstance.tokenize(function(tokenizeErr, payload) {
                  if (tokenizeErr) {
                    onCardAdded.emit({ error: true });
                    return;
                  }
                  onCardAdded.emit(payload.nonce);
                });
              },
              false
            );

            hostedFieldsInstance.on('validityChange', function (event) {
              var allValid = true;
              var field, key;
              var submit = document.getElementById("cardSubmit");
              for (key in event.fields) {
                if (event.fields[key].isValid === false) {
                  allValid = false;
                  break;
                }
              }
              
              if (allValid) {
                submit.removeAttribute('disabled');
              } else {
                submit.setAttribute('disabled', 'disabled');
              }
            });
    
          }
        );
      }
    );
  }

  ngOnInit() {
    if(this.onReady){
      this.onReady.emit({submit:this.submit})
    }
  }

}
