import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { MinistryComponent } from './ministry.component';
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
let fixture: ComponentFixture<MinistryComponent>;
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
        fixture = TestBed.createComponent(MinistryComponent);
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key]
        });
    });

    it('should initialize component', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app, 'getProfile').and.stub();
        spyOn(app, 'getMinistryDetails').and.stub();
        spyOn(app, 'checkRouteParams').and.stub();
        fixture.detectChanges();
        expect(app.checkRouteParams).toHaveBeenCalled();
    }));
});
