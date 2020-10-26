import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProviderHomeComponent} from './service-provider-home/service-provider-home.component';
import { ServiceProviderListComponent} from './service-provider-list/service-provider-list.component';
import { HomepageUserComponent } from "./homepage-user/homepage-user.component";
import { ServiceProviderRegisterComponent } from './service-provider-register/service-provider-register.component';
import { ServicerequestFormComponent } from './servicerequest-form/servicerequest-form.component';
import { ServiceProviderLoginComponent } from './service-provider-login/service-provider-login.component';
import { UserLoginPageComponent} from './user-login-page/user-login-page.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {UserBookingsComponent} from './user-bookings/user-bookings.component';
import {PdfviewComponent} from './pdfview/pdfview.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import{ServiceProviderProfileComponent} from './service-provider-profile/service-provider-profile.component'

const routes: Routes = [
  { path: '',   redirectTo: '/UserLoginPage', pathMatch: 'full' },
  { path: 'viewserviceproviderlist', component: ServiceProviderListComponent },
  { path: 'serviceproviderhome', component: ServiceProviderHomeComponent},
  { path: 'userhome', component:HomepageUserComponent},
  { path: 'serviceproviderlogin', component:ServiceProviderLoginComponent},
  { path: 'serviceproviderregister', component: ServiceProviderRegisterComponent},
  { path: 'UserLoginPage' , component: UserLoginPageComponent},
  { path: 'userRegisterPage' , component: UserRegisterComponent},
  { path: 'userbookings', component : UserBookingsComponent},
  { path: 'pdfview', component : PdfviewComponent},
  { path: 'contactus', component : ContactUsComponent},
  {path: 'userProfile', component: UserProfileComponent},
  { path: 'forgotpassword', component : ForgotPasswordComponent},
  {path:'serviceproviderprofile', component:ServiceProviderProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [
  HomepageUserComponent ,
  ServiceProviderHomeComponent,
  ServiceProviderListComponent,
  ServiceProviderHomeComponent,
  UserBookingsComponent,
  ServiceProviderRegisterComponent,
  ServicerequestFormComponent,
  ServiceProviderLoginComponent,
  UserLoginPageComponent];
