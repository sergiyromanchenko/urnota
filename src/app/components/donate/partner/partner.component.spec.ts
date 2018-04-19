

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { PartnerComponent } from './partner.component';
import { SigninComponent } from "@app/components/modals/signin/signin.component";
let fixture: ComponentFixture<PartnerComponent>;

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
    fixture = TestBed.createComponent(PartnerComponent);
    fixture.detectChanges();
  });

  it('should contain expected properties', async(() => {

    const app = fixture.debugElement.componentInstance;
    expect(app.rangeValues).toBeDefined();
    expect(app.fundsList).toBeDefined();
    expect(app.fundData).toBeDefined();
  }));

  it('should prepare slider config', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    // Check basic properties
    expect(app.sliderConfig.snap).toBeDefined();
    expect(app.sliderConfig.range).toBeDefined();
  }));

  it('should have valid start value', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    expect(app.fundData.amount).toBe(200);
  }));

  it('should have valid start value', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    expect(app.fundData.amount).toBe(200);
  }));

  it('should calculate right percent', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.getFundPercent(2000, 20)).toBe('1');
    expect(app.getFundPercent(100, 50)).toBe('50');
  }));

  it('should correctly open signin modal', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.modalService, "open").and.stub();
    expect(app.modalService).toBeDefined();
    app.showSignin({somedata:true});
    expect(app.modalService.open).toHaveBeenCalledWith(SigninComponent, { windowClass: 'signin-modal' });
  }));

  it('should calculate closest value', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.closest([2,4,5,23,45], 20)).toBe(23);
  }));

  it('should correctly recalculate fund items', async(() => {
    const app = fixture.debugElement.componentInstance;
    // Check for all items
    app.fundData["totalAmount"] = 300;
    app.recalculateItemsFundAmount();
    expect(app.fundsList[3].fund).toBe(60);
    // Check for small number
    app.fundData["totalAmount"] = 6;
    app.recalculateItemsFundAmount();
    expect(app.fundsList[1].fund).toBe(2);
    expect(app.fundsList[3].fund).toBe(0);
    // Check for some non active
    app.fundData["totalAmount"] = 300;
    app.fundsList[1].active = false
    app.fundsList[3].active = false
    app.recalculateItemsFundAmount();
    expect(app.fundsList[0].fund).toBe(100);
    expect(app.fundsList[2].fund).toBe(100);
    expect(app.fundsList[4].fund).toBe(100);
  }));

  it('should correctly recalculate total amount', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    app.recalculateItemsFundAmount();
    app.fundsList[2].fund = "200"
    app.recalculateTotalFundAmount()
    expect(app.fundData["totalAmount"]).toBe(360);
  }));

  it('should correctly calculate that fund item can be disabled', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    app.recalculateItemsFundAmount();
    app.fundsList = [
      {active:true},
      {active:false},
      {active:false},
      {active:false},
    ]
    expect(app.fundItemCanDisable()).toBeFalsy();
  }));

  it('should correctly set customTotalAmount value', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.prepareSliderConfig();
    app.recalculateItemsFundAmount();
    app.toggleTotalAmountInput("$5")
    expect(app.fundData.customTotalAmount).toBe("$5");
    app.toggleTotalAmountInput("$1000")
    expect(app.fundData.customTotalAmount).toBe("$1,000");
    app.fundsList = [
      { active: true, fund: 150 },
      { active: true, fund: 100 },
      { active: false, fund: 0 },
      { active: false, fund: 0 },
    ]
    app.toggleTotalAmountInput("$0")
    expect(app.fundData.customTotalAmount).toBe("$250");
  }));




});
