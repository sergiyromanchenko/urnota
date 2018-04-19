import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { ProfileQuickActionsComponent } from './profile-quick-actions.component';
import { Observable } from "rxjs/Observable";
import { gPlaceMock } from '@app/mocks/gPlaceData.mock';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
let store = {
    fundData: {
        totalAmount: 500,
        subscription: "monthly"
    }
};
let params: Subject<any>;
let fixture: ComponentFixture<ProfileQuickActionsComponent>;
let profileService = {
    isAuthenticated: () => {
        return true
    }
}
describe('ProfileQuickActionsComponent', () => {
    beforeEach(() => {
        params = new Subject<any>();
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            routeConfig: {
                                path:"forgotPassword"
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ProfileQuickActionsComponent);
    });

    it("should redirect in case of not 'donate' path", async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.router, "navigate").and.stub();
        app.showSignin(null);
        expect(app.router.navigate).toHaveBeenCalledWith(["/signin"])
    }));

});
