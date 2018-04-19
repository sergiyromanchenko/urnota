import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { CompleteProfileComponent } from './complete-profile.component';
import { SharedDataService } from '@app/services/shared-data.service';
import { Observable } from "rxjs/Observable";
import { gPlaceMock } from '@app/mocks/gPlaceData.mock';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
let store = {
    fundData: {
        totalAmount: 500,
        subscription: "monthly"
    }
};
let fixture: ComponentFixture<CompleteProfileComponent>;
let profileService = {
    isAuthenticated: () => {
        return true
    }
}
describe('CompleteProfileComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CompleteProfileComponent);
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key]
        });
    });

    it('should check for needed data', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.sharedDataService, 'get');
        spyOn(app, 'getProfile').and.stub();
        fixture.detectChanges();
        expect(app.sharedDataService.get).toHaveBeenCalledWith("fundData");
    }));

    it('should check for token and save', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'getProfile').and.returnValue(Observable.from([{ data: { attributes: { test: 123 } } }]))
        spyOn(app.sharedDataService, 'save');
        app.access_token = "Bearer BLAH";
        fixture.detectChanges();
        expect(app.sharedDataService.save).toHaveBeenCalled();
        expect(app.userData).toEqual({ test: 123 });
    }));

    it('should submit form and navigate to about', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'updateProfile').and.returnValue(Observable.from([true]))
        spyOn(app.profileService, 'getProfile').and.returnValue(Observable.from([{ data: { attributes: { test: 123 } } }]))
        spyOn(app.router, 'navigate').and.stub()
        fixture.detectChanges();
        app.onProfileFormSubmit();
        expect(app.profileService.updateProfile).toHaveBeenCalled();
        expect(app.router.navigate).toHaveBeenCalledWith(['/ministry/ffm/about']);
    }));

    it('should validate activateStep method logic', async(() => {
        const app = fixture.debugElement.componentInstance;
        app.activateStep(1);
        expect(app.activeStep).toBe(2)
        app.activateStep(5);
        expect(app.activeStep).toBe(2);
        app.activeStep = 3
        expect(2).toBe(2);
    }));

    it('should update address', async(() => {
        const app = fixture.debugElement.componentInstance;
        let addressData = {
          postal_code:'67042',
          state:"Kansas",
          city:"El Dorado",
          street:"Dellway Street,271"
        }
        app.setAddress(gPlaceMock);
        expect(app.userData).toEqual({
          zip_code:addressData.postal_code,
          state:addressData.state,
          city:addressData.city,
          address:addressData.street
        });
      }));
});
