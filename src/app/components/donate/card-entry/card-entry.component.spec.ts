

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { CardEntryComponent } from './card-entry.component';
import { SharedDataService } from '@app/services/shared-data.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
let store = {
    fundData: {
        totalAmount: 500,
        subscription: "monthly"
    }
};
let fixture: ComponentFixture<CardEntryComponent>;
let profileService = {
    isAuthenticated: () => {
        return true
    }
}
describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CardEntryComponent);
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key]
        });
    });
    
    it('should submit added card info then go to donation done', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.sharedDataService, 'save').and.stub();
        spyOn(app.paymentService, 'sendPayment').and.returnValue(Observable.from([{ data: [1] }]));
        spyOn(app.profileService, "getProfile").and.returnValue(Observable.from([{ data: [] }]));
        let promise = Promise.resolve({ access_token: "sometoken" });
        let nonce = "nonce";
        let paymentInfo = {
            amount: 500,
            subscription: "monthly"
        };
        app.paymentInfo = paymentInfo;
        spyOn(app.profileService, 'auth').and.returnValue(promise);
        spyOn(app.profileService, 'isAuthenticated').and.returnValue(false)
        spyOn(app, 'getProfileAndProceed').and.callThrough();
        spyOn(app, 'addPaymentMethod').and.callThrough();
        spyOn(app.router, 'navigate').and.stub();
        fixture.detectChanges();
        app.cardAdded(nonce);
        expect(app.profileService.isAuthenticated).toHaveBeenCalled();
        expect(app.profileService.auth).toHaveBeenCalled();
        promise.then(() => {
            expect(app.getProfileAndProceed).toHaveBeenCalledWith(nonce);
            expect(app.profileService.getProfile).toHaveBeenCalled();
            expect(app.addPaymentMethod).toHaveBeenCalled();
            expect(app.paymentService.sendPayment).toHaveBeenCalledWith({
                nonce_from_the_client: "nonce",
                amount: 500,
                subscription: "monthly"
            });
            expect(app.router.navigate).toHaveBeenCalledWith(['/donate/donationDone']);
        })
    }));

    it('should get payment methods for authenticated user', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'isAuthenticated').and.callFake(function () {
            return true
        });
        spyOn(app.paymentService, 'getPaymentMethods').and.returnValue(Observable.from([{ data: [{attributes:{method:true, card_type: "Visa"}}] }]))
        spyOn(app, 'getPaymentMethods').and.callThrough();
        fixture.detectChanges();
        expect(app.profileService.isAuthenticated).toHaveBeenCalled();
        expect(app.profileService.isAuthenticated()).toBeTruthy();
        expect(app.getPaymentMethods).toHaveBeenCalled();
        expect(app.paymentService.getPaymentMethods).toHaveBeenCalled();
        expect(app.paymentMethods.length).toBeGreaterThan(0);
    }));

});
