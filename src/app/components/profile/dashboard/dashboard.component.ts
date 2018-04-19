import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { single, multi } from './data';
import { DashboardService } from "@app/services/dashboard.service"
import * as _ from 'lodash';

@Component({
  selector: 'profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileDashboardComponent {
  campaigns: any = [];
  donations: any = undefined;
  overview: any = [];
  subscriptionsSummary: any = {
    amount_per_month: 0,
    paid: 0,
    should_be_paid: 0
  }
  loading: any = {
    campaigns: true,
    overview: true,
    donations: true
  }
  legend = [{
    value: "Pledge",
    color: "#66c05f"
  }, {
    value: "Donations",
    color: "#ffc626"
  }]
  pieOverviewChart: any = [];
  // verticalOverviewChartConfig Configuration
  chartConfig: Object = {
    showXAxis: true,
    showYAxis: true,
    showLegend: false,
    showXAxisLabel: true,
    showYAxisLabel: true,
    colorScheme: {
      domain: _.map(this.legend, (legendItem) => { return legendItem.color }).reverse()
    }
  }

  verticalOverviewChart: any = [];
  activeTab: Number = 1;
  // Mock
  cardItems: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor(private _sanitizer: DomSanitizer, private dashboardService: DashboardService) {
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    if (this.activeTab == 2 && !this.donations) {
      this.getDonations();
    }
  }

  sanitizeImage(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  getCampaigns() {
    this.dashboardService.getCampaigns().subscribe((res) => {
      this.campaigns = res.data;
      this.calculateSubscriptionsSummary();
    })
  }

  getOverview() {
    this.dashboardService.getOverview().subscribe((res) => {
      this.overview = res.data;
      this.loading.overview = false;
      this.calculateVerticalOverviewChart();
      this.calculatePieOverviewChart();
    })
  }

  getDonations() {
    this.dashboardService.getDonations().subscribe((res) => {
      this.donations = res.data;
      this.loading.donations = false;
    })
  }

  getSummarySum() {
    return _.values(this.overview.summary).reduce((a, b) => a + b, 0);
  }

  getFundPercent(total, value) {
    let percent = value * 100 / total;
    return percent.toFixed();
  }

  calculateVerticalOverviewChart() {
    let keys = _.union(_.keys(this.overview.donations), _.keys(this.overview.pledges));
    keys.forEach((date, index) => {
      let obj = {
        name: date,
        "series": [
          {
            "name": "Pledge",
            "value": this.overview['pledges'][date] || 0
          },
          {
            "name": "Donations",
            "value": this.overview['donations'][date] || 0
          }
        ]
      }
      this.verticalOverviewChart.push(obj)
    })
  }

  calculatePieOverviewChart() {
    this.pieOverviewChart = _.map(this.overview.summary, function (value, key) {
      return { name: key, value: value };
    });
  }

  calculateSubscriptionsSummary() {
    this.campaigns.forEach(el => {
      this.subscriptionsSummary.amount_per_month += el.attributes.amount_per_month
      this.subscriptionsSummary.paid += el.attributes.paid
      this.subscriptionsSummary.should_be_paid += el.attributes.should_be_paid
    });
    this.loading.campaigns = false;
  }

  ngOnInit() {
    this.getCampaigns();
    this.getOverview();
  }

}
