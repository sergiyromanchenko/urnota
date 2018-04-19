

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { PaymentMethodEditComponent } from './payment-method-edit.component';
import { SharedDataService } from '@app/services/shared-data.service';
import { MockSharedDataService } from "./shared-data-service.mock"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
let respData = { data: "resp" };
let fixture: ComponentFixture<PaymentMethodEditComponent>;
describe('PaymentMethodEditComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).overrideComponent(PaymentMethodEditComponent, {
      set: {
        providers: [
          { provide: SharedDataService, useClass: MockSharedDataService }
        ]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(PaymentMethodEditComponent);
    fixture.detectChanges();
  });

  it('should contain expected properties', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.paymentMethods).toBeDefined();
    expect(app.actionLoading).toBeFalsy();
    expect(app.type).toBeDefined();
  }));

  it('should get correct card type', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.getCardType()).toBe("visa");
  }));

  it('should delete payment method', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.paymentService, "deletePaymentMethod").and.returnValue(Observable.from([respData]));
    spyOn(app, "c").and.callThrough();
    spyOn(app.activeModalRef, "close").and.stub();
    app.deleteMethod();
    expect(app.actionLoading).toBeTruthy();
    expect(app.paymentService.deletePaymentMethod).toHaveBeenCalledWith("card_1BvWnbAvil4sbVRDBQCOo2OQ", "stripe");
    expect(app.c).toHaveBeenCalledWith(respData);
    expect(app.activeModalRef.close).toHaveBeenCalledWith(respData);
  }));

  it('should create payment method', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.paymentService, "createPaymentMethod").and.returnValue(Observable.from([respData]));
    spyOn(app, "c").and.callThrough();
    spyOn(app.activeModalRef, "close").and.stub();
    app.cardAdded("tok");
    expect(app.actionLoading).toBeTruthy();
    expect(app.paymentService.createPaymentMethod).toHaveBeenCalledWith({ token: "tok" });
    expect(app.c).toHaveBeenCalledWith(respData);
    expect(app.activeModalRef.close).toHaveBeenCalledWith(respData);
  }));

  it('should update payment method', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.paymentService, "updatePaymentMethod").and.returnValue(Observable.from([respData]));
    spyOn(app, "c").and.callThrough();
    spyOn(app.activeModalRef, "close").and.stub();
    app.expiration_date = "12/19"
    app.updatePaymentMethod();
    expect(app.actionLoading).toBeTruthy();
    expect(app.paymentService.updatePaymentMethod).toHaveBeenCalledWith({
      exp_month: "12",
      exp_year: "19"
    }, "card_1BvWnbAvil4sbVRDBQCOo2OQ");
    expect(app.c).toHaveBeenCalledWith(respData);
    expect(app.activeModalRef.close).toHaveBeenCalledWith(respData);
  }));

  it('should calculate correct expiration date', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.activeModalRef, "close").and.stub();
    expect(app.expiration_date).toBe("12/19");
  }));

});
