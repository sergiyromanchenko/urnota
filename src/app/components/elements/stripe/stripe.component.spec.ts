

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { StripeComponent } from './stripe.component';
let fixture: ComponentFixture<StripeComponent>;

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents();
        fixture = TestBed.createComponent(StripeComponent);
    });

    it('should contain expected properties', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app.stripeValid).toBeFalsy();
    }));

    it('should load scripts on init and create stripe instance', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app, "loadScript").and.callThrough();
        spyOn(app, "createStripeInstance").and.stub();
        fixture.detectChanges();
        expect(app.loadScript).toHaveBeenCalled();
        setTimeout(function () {
            expect(app.createStripeInstance).toHaveBeenCalled();
        }, 2000);
    }));


});
