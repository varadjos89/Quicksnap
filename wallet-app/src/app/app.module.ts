import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule ,routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProvider} from './services/serviceProviderService';
import { userService} from './services/userService';
import { HomepageUserComponent} from './homepage-user/homepage-user.component'
import { UserRegisterComponent} from './user-register/user-register.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { MaterialModule } from './material';
import {UserBookingsComponent} from './user-bookings/user-bookings.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PdfviewComponent } from './pdfview/pdfview.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ServiceProviderProfileComponent } from './service-provider-profile/service-provider-profile.component';
import {ServiceProviderHeaderComponent} from './service-provider-header/service-provider-header.component'

@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    HomepageUserComponent,
    UserRegisterComponent,
    UserLoginPageComponent,
    UserBookingsComponent,
    ContactUsComponent,
    PdfviewComponent,
    UserProfileComponent,
    UserHeaderComponent,
    ForgotPasswordComponent,
    ServiceProviderProfileComponent,
    ServiceProviderHeaderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
    ],
  providers: [ServiceProvider],
  bootstrap: [AppComponent]
})

export class AppModule { }
