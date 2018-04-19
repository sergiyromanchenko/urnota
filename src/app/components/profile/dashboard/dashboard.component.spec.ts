import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { ProfileDashboardComponent } from './dashboard.component';
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
let fixture: ComponentFixture<ProfileDashboardComponent>;
let profileService = {
    isAuthenticated: () => {
        return true
    }
}
describe('ProfileDashboardComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ProfileDashboardComponent);
    });

    it('should contain basic properties', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app.subscriptionsSummary).toBeDefined();
        expect(app.loading).toBeDefined();
        expect(app.legend).toBeDefined();
        expect(app.chartConfig).toBeDefined();
    }));


    it('should set right tab', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app, "getDonations").and.stub();
        expect(app.activeTab).toBe(1);
        app.setActiveTab(2);
        expect(app.activeTab).toBe(2);
        expect(app.getDonations).toHaveBeenCalled();
    }));

    it('should get сampaigns and make calculation', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app.dashboardService, "getCampaigns").and.returnValue(Observable.from([{ data: [] }]));
        spyOn(app, "calculateSubscriptionsSummary").and.stub();
        spyOn(app, "getOverview").and.stub();
        spyOn(app, "getCampaigns").and.callThrough();
        fixture.detectChanges();
        expect(app.getCampaigns).toHaveBeenCalled();
        expect(app.calculateSubscriptionsSummary).toHaveBeenCalled();
    }));

    it('should get overview on component start', async(() => {
        const app = fixture.debugElement.componentInstance;
        spyOn(app, "getCampaigns").and.stub();
        spyOn(app, "getOverview").and.stub();
        fixture.detectChanges();
        expect(app.getOverview).toHaveBeenCalled();
    }));
});
