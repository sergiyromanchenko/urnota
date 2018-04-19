import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { SigninComponent } from './signin.component';
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
let fixture: ComponentFixture<SigninComponent>;
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
    fixture = TestBed.createComponent(SigninComponent);
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key]
    });
  });

  it('should check for needed properties', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.signinData).toBeDefined();
    expect(app.error).toBe(null);
  }));

  it('should authorize user with correct credentials', async(() => {
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, "signin").and.returnValue(Observable.from([{ access_token: "Bearer MOCK" }]))
    spyOn(app.profileService, "getProfile").and.returnValue(Observable.from([{ data: {} }]))
    spyOn(app.profileService, "profileUpdated").and.callThrough();
    spyOn(app.sharedDataService, "save").and.stub();
    spyOn(app, "getProfileAndProceed").and.callThrough();
    spyOn(app.activeModalRef, "close").and.callThrough();
    app.submitSignin()
    expect(app.profileService.signin).toHaveBeenCalled();
    expect(app.sharedDataService.save).toHaveBeenCalled();
    expect(app.profileService.getProfile).toHaveBeenCalled();
    expect(app.profileService.profileUpdated).toHaveBeenCalled();
    expect(app.activeModalRef.close).toHaveBeenCalled();
  }));
});
