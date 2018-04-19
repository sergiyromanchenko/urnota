import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from "@angular/core";
import { PaymentService } from "@app/services/payment.service";
import { PaymentMethodEditComponent } from "@app/components/modals/payment-method-edit/payment-method-edit.component";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { CardInputComponent } from '@app/components/elements/card-input/card-input.component';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SharedDataService } from "@app/services/shared-data.service";
import { CustomModalService } from "@app/services/customModal.service"
@Component({
  selector: "profile-payment-methods",
  templateUrl: "./payment-methods.component.html",
  styleUrls: ["./payment-methods.component.scss"],
  encapsulation: ViewEncapsulation.None,

})
export class ProfilePaymentMethodsComponent implements OnInit {

  paymentProviders: Array<String> = ["stripe", "braintree"]
  paymentMethods: Object = {};
  tabSet: Array<String> = ["Credit Card", "PayPal"];
  braintreeRef: any;
  form: any = {};
  activeModalRef: any;
  modalError: any;
  ongoingProcessingMethod: any;
  paymentMethodsLoading: Boolean = true;
  @ViewChild('cardInput') child;

  getPaymentMethods(provider) {
    this.paymentService.getPaymentMethods(provider).subscribe(res => {
      this.paymentMethods[provider] = res.data;
      this.paymentMethodsLoading = false;
    });
  }

  constructor(private paymentService: PaymentService, private modalService: NgbModal, private _fb: FormBuilder, private activeModal: NgbActiveModal, private sharedDataService: SharedDataService, private customModalService:CustomModalService) { }

  showEditPaymentMethod(type, method?:any, provider?:String) {
    if(method){
      method.attributes.provider = provider;
    }

    if(type == 'update' && provider != 'stripe'){
      type = 'add'
    }
    this.sharedDataService.save("methodEditData", {type:type, method: method || null});
    let editModalRef = this.customModalService.open(PaymentMethodEditComponent, { windowClass: 'payment-method-edit-modal d-flex align-items-center custom-show' });
    editModalRef.result.then((result) => {
      this.loadPaymentMethods();
    }, (err) => {
      console.error(err);
    })
  }

  onBraintreeReady(braintreeRef) {
    this.braintreeRef = braintreeRef;
  }

  updateCreditCard(data) {
    this.form.expiration_date = this.form.expiration_date.replace(/ /g, '');
    this.paymentService.updatePaymentMethod(this.form, this.ongoingProcessingMethod.token).subscribe((res) => {
      this.activeModalRef.close();
      this.form = {};

    }, (err) => {
      this.modalError = err.alert;
    })
  }

  getMethodActionText(method, provider){
    if(provider == 'braintree'){
      return 'Update Card'
    }
    return "Edit"
  }

  openModal(content) {
    // this.modalRef = this.modalService.open(content)
  }

  loadPaymentMethods() {
    this.paymentMethods = {};
    this.paymentMethodsLoading = true;
    this.paymentProviders.forEach((el) => {
      this.getPaymentMethods(el);
    })
  }

  ngOnInit() {
    this.loadPaymentMethods();
  }
}
