import { TestBed, inject } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
  it('should contain required methods', inject([DashboardService], (service: DashboardService) => {
    expect(service.getCampaigns).toBeDefined();
    expect(service.getOverview).toBeDefined();
    expect(service.getDonations).toBeDefined();
  }));

});
