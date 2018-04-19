import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Donate
import { DonateComponent } from './components/donate/donate.component';
import { PartnerComponent } from './components/donate/partner/partner.component';
import { CardEntryComponent } from './components/donate/card-entry/card-entry.component';
import { DonationDoneComponent } from './components/donate/donation-done/donation-done.component';
import { CompleteProfileComponent } from './components/donate/complete-profile/complete-profile.component';
import { CardEntryErrorComponent } from './components/donate/card-entry-error/card-entry-error.component';
import { UserInfoComponent } from './components/donate/user-info/user-info.component';
// Profile
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile/settings/settings.component';
import { ProfilePaymentMethodsComponent } from './components/profile/payment-methods/payment-methods.component';
import { ProfileDashboardComponent } from './components/profile/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/profile/reset-password/reset-password.component';
import { PaymentsComponent } from './components/profile/payments/payments.component';
import { PaymentsEditComponent } from './components/profile/payments-edit/payments-edit.component';
import { SubscriptionsComponent } from './components/profile/subscriptions/subscriptions.component';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { NouisliderModule } from 'ng2-nouislider';
// Resolvers
import { ProfileResolver } from './resolvers/profile';
// Home
import { HomeComponent } from './components/home/home.component';
// Ministry
import { MinistryComponent } from './components/ministry/ministry/ministry.component';
import { AboutComponent } from './components/ministry/about/about.component';
import { DepartmentsComponent } from './components/ministry/departments/departments.component';
import { BudgetComponent } from './components/ministry/budget/budget.component';
import { CampaignsComponent } from './components/ministry/campaigns/campaigns.component';
import { EventsComponent } from './components/ministry/events/events.component';
import { MyDonationsComponent } from './components/ministry/my-donations/my-donations.component';
import { PromoComponent } from './components/ministry/promo/promo.component';
// Mobile
import { MobileComponent } from './components/mobile/mobile.component'
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'donate', component: DonateComponent,
    children: [
      { path: 'partner', component: PartnerComponent },
      { path: 'cardEntry', component: CardEntryComponent },
      { path: 'cardEntryError', component: CardEntryErrorComponent },
      { path: 'donationDone', component: DonationDoneComponent },
      { path: 'completeProfile', component: CompleteProfileComponent },
      { path: 'userInfo', component: UserInfoComponent }
    ]
  },
  {
    path: 'profile', component: ProfileComponent, runGuardsAndResolvers: "always",
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'settings'
      },
      { path: 'settings', component: ProfileSettingsComponent, canActivate: [AuthGuard], data: { profileTabSegment: true } },
      { path: 'dashboard', component: ProfileDashboardComponent, canActivate: [AuthGuard], data: { profileTabSegment: false } },
      { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [AuthGuard], data: { profileTabSegment: false } },
      { path: 'paymentMethods', component: ProfilePaymentMethodsComponent, canActivate: [AuthGuard], data: { profileTabSegment: true } },
      { path: 'paymentsSubscriptions', component: PaymentsComponent, canActivate: [AuthGuard], data: { profileTabSegment: true } },
      { path: 'paymentsSubscriptions/:id', component: PaymentsEditComponent, data: { profileTabSegment: true } }
    ]

  },
  {
    path: 'ministry/:name', component: MinistryComponent,
    children: [
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
      { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
      { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
      { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] },
      { path: 'promo', component: PromoComponent, data: { contentOnly: true } },
      { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
      { path: 'MyDonations', component: MyDonationsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'mobile', component: MobileComponent
  },
  { path: 'dashboard', component: ProfileDashboardComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
];

@NgModule({
  providers: [
    ProfileResolver
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
