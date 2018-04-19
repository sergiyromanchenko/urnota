import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppModule } from "@app/app.module"
import { RouterTestingModule } from "@angular/router/testing";
import { ProfileSettingsComponent } from './settings.component';
import { SharedDataService } from '@app/services/shared-data.service';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router"
import { gPlaceMock } from '@app/mocks/gPlaceData.mock';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
let activatedRouteMock = {
  parent: {
    snapshot: {
      data: {
        profile: {
          data: {
          }
        }
      }
    }
  }
}
let store = {
  fundData: {
    totalAmount: 500,
    subscription: "monthly"
  }
};
let fixture: ComponentFixture<ProfileSettingsComponent>;
let profileService = {
  isAuthenticated: () => {
    return true
  }
}
describe('ProfileSettingsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: activatedRouteMock
        }
      ]

    }).compileComponents();
    fixture = TestBed.createComponent(ProfileSettingsComponent);
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key]
    });
  });

  it('should update address', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.r = RouterTestingModule
    let addressData = {
      postal_code:'67042',
      state:"Kansas",
      city:"El Dorado",
      street:"Dellway Street,271"
    }
    app.profileData = {}
    app.setAddress(gPlaceMock);
    expect(app.profileData).toEqual({
      zip_code: addressData.postal_code,
      state: addressData.state,
      city: addressData.city,
      address: addressData.street
    });
  }));
});
