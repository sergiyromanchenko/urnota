import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { forEach } from "@angular/router/src/utils/collection";
import { CurrencyPipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedDataService } from "@app/services/shared-data.service";
import { ApiService } from "@app/services/api.service";
import { ProfileService } from "@app/services/profile.service";
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
import { CustomCurrencyPipe } from '@app/pipes/custom-currency.pipe';
import { ISubscription } from "rxjs/Subscription";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from "@app/components/modals/signin/signin.component";
import { CustomModalService } from "@app/services/customModal.service"
@Component({
  selector: "partner",
  templateUrl: "./partner.component.html",
  styleUrls: ["./partner.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit {
  single: any[] = [];
  expencesSum: number = 0;
  profileData: any = {};
  error: any = new Object();
  fundData: any = {
    subscription: "monthly"
  };
  totalAmountInputShown: boolean = false;
  loading: boolean;
  @ViewChild('t') public tooltip: NgbTooltip;
  // Used to avoid fundData["totalAmount"] update on manual change via input
  valueChangedManually: boolean = false;
  rangeValues: Array<number> = [
    5,
    10,
    15,
    20,
    25,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    125,
    150,
    175,
    200,
    250,
    300,
    350,
    400,
    500,
    600,
    700,
    800,
    900,
    1000
  ];
  authData: any = {};
  fundsShown: boolean = false;
  sliderConfig: any = new Object();
  fundsList: Array<Object> = this.sharedDataService.get("fundsList") || [
    { name: "General Fund", goal: 48500, funded: 5000, active: true },
    { name: "Evangelism", goal: 20520, funded: 9000, active: true },
    { name: "Act of Love", goal: 38555, funded: 13000, active: true },
    { name: "Media", goal: 15000, funded: 5000, active: true },
    { name: "Destiny center", goal: 15000, funded: 5000, active: true }
  ];

  colorScheme = { domain: [] };

  chartMockData = [
    { name: "Administration", value: 100000, color: "#ffe164" },
    { name: "Media", value: 150000, color: "#fac733" },
    { name: "Evangelism", value: 250000, color: "#f4873c" },
    { name: "Act of Love", value: 500000, color: "#da4335" }
  ];

  constructor(
    public router: Router,
    public sharedDataService: SharedDataService,
    public apiService: ApiService,
    public profileService: ProfileService,
    public customCurrencyPipe: CustomCurrencyPipe,
    public modalService: NgbModal,
    public activatedRoute: ActivatedRoute,
    public customModalService: CustomModalService
  ) { }

  prepareSliderConfig() {
    let values = this.rangeValues;
    this.sliderConfig["snap"] = true;
    this.sliderConfig["range"] = {
      min: values[0],
      max: values[values.length - 1]
    };
    values.splice(0, 1).splice(values.pop(), 1);
    let stepPercent = 90 / values.length;
    let step = 0;
    values.forEach((val, index) => {
      ++index;
      this.sliderConfig["range"][(step += stepPercent).toFixed() + "%"] = val;
    });
    let amount;
    if (this.sharedDataService.get("fundData")) {
      amount = this.sharedDataService.get("fundData").amount;
      this.toggleFunds();
    }
    this.fundData["amount"] = amount || 200;
    this.fundData["totalAmount"] = this.fundData["totalAmount"] || this.fundData["amount"];
    this.fundData["customTotalAmount"] = this.customCurrencyPipe.transform(this.fundData["totalAmount"]);
  }

  sumExpences() {
    this.chartMockData.forEach(function (item) {
      this.expencesSum += item.value;
    }, this);
  }

  prepareChartData() {
    this.chartMockData.forEach(element => {
      this.single.push(element);
      this.colorScheme.domain.push(element.color);
    });
  }

  toggleFunds(value?: boolean) {
    if (this.valueChangedManually) {
      this.valueChangedManually = false;
      return;
    }
    this.fundsShown = value || !this.fundsShown;
    if (value) {
      this.fundData["totalAmount"] = this.fundData["amount"];
      this.recalculateItemsFundAmount();
    }
  }

  updateFundAmount(amount){
    this.fundData.amount = amount;
  }

  toggleFundItem(item, index) {
    if (this.activeIndexes().length == 0) {
      item["active"] = true;
      return;
    }
    // item["active"] = !item.active;
    this.recalculateItemsFundAmount();
  }

  activeIndexes() {
    return _.filter(this.fundsList, function (item) {
      return item["active"] == true;
    });
  }

  recalculateItemsFundAmount() {
    let activeIndexes = [];
    _.each(this.fundsList, function (item, index) {
      if (item["active"] == true) {
        activeIndexes.push(index);
      }
      item["fund"] = "";
    });

    let fundPart = this.fundData["totalAmount"] / activeIndexes.length;
    let amount = 0;
    activeIndexes.forEach((item, index) => {
      if (amount + Math.ceil(fundPart) <= this.fundData["totalAmount"]) {
        this.fundsList[item]["fund"] = Math.ceil(fundPart);
      } else {
        this.fundsList[item]["fund"] = Math.floor(fundPart);
      }
      // Check if not bigger
      if (amount + Math.ceil(fundPart) > this.fundData["totalAmount"]) {
        this.fundsList[item]["fund"] = 0;

      }
      amount += Math.ceil(fundPart);
    });

    if (this.fundData["totalAmount"] / activeIndexes.length < 1) {
      activeIndexes.forEach((item, index) => {
        if (index > this.fundData["totalAmount"] - 1) {
          this.fundsList[item]["fund"] = 0;
        }
      });
    }
    this.fundData["customTotalAmount"] = this.customCurrencyPipe.transform(this.fundData["totalAmount"])
    this.adjustFundItemsValue();
  }

  recalculateTotalFundAmount(item?: any, index?: any) {
    if (item && !item.fund) {
      item.fund = 0;
    }
    let sum = 0;
    _.each(this.fundsList, function (item, index) {
      if (item["active"] == true) {
        sum = sum + parseInt(item["fund"]);
      }
    });
    this.fundData["totalAmount"] = sum;
    this.fundData["customTotalAmount"] = this.customCurrencyPipe.transform(this.fundData["totalAmount"])
    this.valueChangedManually = true;
    this.setSliderValue(sum);
  }

  getFundPercent(total, value) {
    let percent = value * 100 / total;
    return percent.toFixed();
  }

  selectFundDuration(type) {
    this.fundData["subscription"] = type;
    this.sharedDataService.save("fundData", this.fundData);
    this.router.navigate(["donate/userInfo"]);
  }

  toggleTotalAmountInput(value) {
    value = parseInt(value.replace("$", "").replace(/,/g, ""));

    if(value < 1 || !value){
      this.fundData["customTotalAmount"] = this.customCurrencyPipe.transform(_.reduce(this.fundsList, function(sum, n) {
        return sum + n["fund"];
      }, 0));
      return
    }
    this.fundData["customTotalAmount"] = this.customCurrencyPipe.transform(value) || "";
    this.totalAmountInputShown = !this.totalAmountInputShown;
    if (value) {
      this.fundData["totalAmount"] = value;
      this.valueChangedManually = true;
      this.recalculateItemsFundAmount();
      this.fundsShown = true;
      this.setSliderValue(value);
    }
  }

  adjustFundItemsValue() {
    let amount = 0;
    var sumUpItems = _.take(
      this.activeIndexes(),
      this.activeIndexes().length - 1
    );
    sumUpItems.forEach(item => {
      amount += item["fund"];
    });
    this.activeIndexes()[this.activeIndexes().length - 1]["fund"] =
      this.fundData["totalAmount"] - amount;
  }

  setSliderValue(value) {
    this.fundData.amount =
      value > this.sliderConfig.range.max
        ? this.sliderConfig.range.max
        : this.closest(this.rangeValues, value);
  }

  closest(array, num) {
    let i: any = 0;
    var minDiff = 1000;
    var ans;
    for (i in array) {
      var m = Math.abs(num - array[i]);
      if (m < minDiff) {
        minDiff = m;
        ans = array[i];
      }
    }
    return ans;
  }

  saveDataAndProceed(userData?: any) {
    this.sharedDataService.save("authData", this.authData);
    this.sharedDataService.save("fundData", this.fundData);
    this.sharedDataService.save("fundsList", this.fundsList);
    this.router.navigate(["/donate/cardEntry"]);
  }

  submitFund() {
    this.loading = true;
    this.error = {};
    if (!this.profileService.isAuthenticated() || this.checkEmailDiff()) {
      this.profileService.checkEmail({ email: this.authData.email }).then((res) => {
        this.saveDataAndProceed();
      }, (err) => {
        this.showExistingUserTooltip(true);
        this.loading = false;
      })
    } else {
      this.saveDataAndProceed();
    }
  }

  checkEmailDiff() {
    return this.authData.email != this.sharedDataService.get("profileData").email
  }

  prepareAuthData() {
    if (this.profileService.isAuthenticated()) {
      this.profileSub = this.profileService.getProfile().subscribe(result => {
        this.authData = result.data.attributes;
        this.profileData = result.data.attributes;
        this.sharedDataService.save("profileData", this.authData, true);
      });
    } else {
      this.authData = this.sharedDataService.get("profileData") || {
        email: "",
        name: ""
      };
    }
  }

  showSignin(eventData) {
    this.customModalService.open(SigninComponent, { windowClass: 'signin-modal' })
  }

  fundItemCanDisable() {
    return _.filter(this.fundsList, function (o) { return o["active"]; }).length > 1
  }

  showExistingUserTooltip(avoidClosing) {
    const isOpen = this.tooltip.isOpen();
    if (!avoidClosing) {
      this.tooltip.close();
    }
    if (!isOpen) {
      this.tooltip.open({});
    }
  }

  profileSub: ISubscription;
  getProfile() {
    this.profileSub = this.profileService.getProfile().subscribe(res => {
      this.sharedDataService.save("profileData", res.data.attributes, true);
      this.profileData = res.data.attributes;
    });
  }


  ngOnInit() {
    this.prepareChartData();
    this.sumExpences();
    this.prepareSliderConfig();
    this.prepareAuthData();
    if (this.profileService.isAuthenticated()) {
      this.getProfile()
    }
    else {
      this.authData = this.sharedDataService.get("authData") || {};
    }
    if (this.sharedDataService.get("fundData")) {
      this.fundData = this.sharedDataService.get("fundData");
      this.recalculateItemsFundAmount();
    }
    
  }

  ngOnDestroy() {
    if (!this.sharedDataService.get("fundData")) {
      this.sharedDataService.save("fundData", this.fundData);
      this.sharedDataService.save("fundsList", this.fundsList);
    }
    // if (this.profileSub) {
    //   this.profileSub.unsubscribe();
    // }
  }
}
