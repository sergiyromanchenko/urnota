import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "@app/app-routing.module";
import { HttpModule } from "@angular/http";
import { AppComponent } from "@app/app.component";
import { DynamicBackgroundComponent } from "@app/components/elements/dynamic-background/dynamic-background.component";
import { DynamicLogoComponent } from "@app/components/elements/dynamic-logo/dynamic-logo.component";
import { PartnerComponent } from "@app/components/donate/partner/partner.component";
import { ProgressBarComponent } from "@app/components/elements/progress-bar/progress-bar.component";
import { FooterComponent } from "@app/components/partials/footer/footer.component";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { NouisliderModule } from "ng2-nouislider";
import { CardEntryComponent } from "@app/components/donate/card-entry/card-entry.component";
import { TabNavComponent } from "@app/components/elements/tab-nav/tab-nav.component";
import { DonationDoneComponent } from "@app/components/donate/donation-done/donation-done.component";
import { ToastrModule } from 'ngx-toastr';
import { CompleteProfileComponent } from "@app/components/donate/complete-profile/complete-profile.component";
import { Uploader } from './lib/angular2-http-file-upload';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardDirectivesModule } from '@app/lib/angular-cc-library';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TextMaskModule } from 'angular2-text-mask';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import {ElasticInputModule} from 'angular2-elastic-input';
// Services
import { SharedDataService } from "@app/services/shared-data.service";
import { AngularGooglePlaceService } from "@app/services/googlePlace.service";
import { ApiService } from "@app/services/api.service";
import { ProfileService } from "@app/services/profile.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { PaymentService } from "@app/services/payment.service";
import { SubscriptionService } from "@app/services/subscription.service";
import { DashboardService } from "@app/services/dashboard.service";
import { CustomModalService } from "@app/services/customModal.service";
// Components
import { ProfileComponent } from "@app/components/profile/profile/profile.component";
import { ProfileSettingsComponent } from "@app/components/profile/settings/settings.component";
import { DonateComponent } from "@app/components/donate/donate.component";
import { ProfilePaymentMethodsComponent } from "@app/components/profile/payment-methods/payment-methods.component";
import { ProfileDashboardComponent } from "@app/components/profile/dashboard/dashboard.component";
import { ProfileSettingsNavigationComponent } from "@app/components/profile/settings-navigation/settings-navigation.component";
import { CardInputComponent } from "@app/components/elements/card-input/card-input.component";
// Providers
import { WindowRef } from "@app/window-ref";
// Guards
import { AuthGuard } from "@app/guards/auth.guard";
import { LoginComponent } from '@app/components/login/login.component';
// Pipes
import { KeysPipe } from "@app/pipes/keys.pipe";
import { AutofocusDirective } from '@app/autofocus.directive';
import { ResetPasswordComponent } from './components/profile/reset-password/reset-password.component';
import { PaymentsComponent } from './components/profile/payments/payments.component';
import { PaymentsEditComponent } from './components/profile/payments-edit/payments-edit.component';
import { ProfileQuickActionsComponent } from './components/profile/profile-quick-actions/profile-quick-actions.component';
import { LoaderComponent } from './components/elements/loader/loader.component';
import { LoaderCircleComponent } from './components/elements/loader-circle/loader-circle.component';
import { CardEntryErrorComponent } from './components/donate/card-entry-error/card-entry-error.component';
import { AboutComponent } from './components/ministry/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { CreditCardComponent } from './components/elements/credit-card/credit-card.component';
import { SubscriptionsComponent } from './components/profile/subscriptions/subscriptions.component';
import { UserAvatarComponent } from './components/elements/user-avatar/user-avatar.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { DepartmentsComponent } from './components/ministry/departments/departments.component';
import { MinistryComponent } from './components/ministry/ministry/ministry.component';
import { BudgetComponent } from './components/ministry/budget/budget.component';
import { CampaignsComponent } from './components/ministry/campaigns/campaigns.component';
import { EventsComponent } from './components/ministry/events/events.component';
import { MyDonationsComponent } from './components/ministry/my-donations/my-donations.component';
import {APP_BASE_HREF} from '@angular/common';
import { PromoComponent } from './components/ministry/promo/promo.component';
import { SigninComponent } from './components/modals/signin/signin.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { StripeComponent } from './components/elements/stripe/stripe.component';
import { PaymentMethodEditComponent } from './components/modals/payment-method-edit/payment-method-edit.component';
import { UserInfoComponent } from './components/donate/user-info/user-info.component';
import { SidebarSigninComponent } from './components/elements/sidebar-signin/sidebar-signin.component';
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerName: "access-token",
    noJwtError:true,
    tokenGetter: (() => sessionStorage.getItem("token") || localStorage.getItem("token"))
  }), http);
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  declarations: [
    AppComponent,
    DynamicBackgroundComponent,
    DynamicLogoComponent,
    PartnerComponent,
    ProgressBarComponent,
    FooterComponent,
    CardEntryComponent,
    TabNavComponent,
    DonationDoneComponent,
    CompleteProfileComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    DonateComponent,
    ProfilePaymentMethodsComponent,
    ProfileDashboardComponent,
    ProfileSettingsNavigationComponent,
    CardInputComponent,
    LoginComponent,
    KeysPipe,
    AutofocusDirective,
    ResetPasswordComponent,
    PaymentsComponent,
    PaymentsEditComponent,
    ProfileQuickActionsComponent,
    LoaderComponent,
    CardEntryErrorComponent,
    AboutComponent,
    HomeComponent,
    CreditCardComponent,
    SubscriptionsComponent,
    UserAvatarComponent,
    CustomCurrencyPipe,
    DepartmentsComponent,
    MinistryComponent,
    BudgetComponent,
    CampaignsComponent,
    EventsComponent,
    MyDonationsComponent,
    PromoComponent,
    SigninComponent,
    LoaderCircleComponent,
    MobileComponent,
    StripeComponent,
    PaymentMethodEditComponent,
    UserInfoComponent,
    SidebarSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NouisliderModule,
    ReactiveFormsModule,
    HttpModule,
    ClickOutsideModule,
    CreditCardDirectivesModule,
    PerfectScrollbarModule,
    GooglePlaceModule,
    TextMaskModule,
    AngularSvgIconModule,
    HttpClientModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    NgbModule.forRoot(),
    ElasticInputModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, RequestOptions]
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AuthGuard,
    ApiService,
    ProfileService,
    SharedDataService,
    Uploader,
    PaymentService,
    SubscriptionService,
    DashboardService,
    NgbActiveModal,
    CustomCurrencyPipe,
    AngularGooglePlaceService,
    CustomModalService
  ],
  entryComponents: [SigninComponent, PaymentMethodEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
