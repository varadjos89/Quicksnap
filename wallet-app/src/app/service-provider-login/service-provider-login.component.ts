
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceProvider } from '../services/serviceProviderService';

@Component({
  selector: 'app-service-provider-login',
  templateUrl: './service-provider-login.component.html',
  styleUrls: ['./service-provider-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceProviderLoginComponent implements OnInit {

  useremail: String;
  confirmation;
  userpassword: String;
  navigationExtras: NavigationExtras = {
    queryParams: {
      "user": this.confirmation,

    }
  }
  showErrorMessage: boolean;
  errorMsg: String;
  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceProvider: ServiceProvider
  ) { }

  ngOnInit() {
    this.showErrorMessage = false;
  }

//  this function gets the serviceprovider from the server and compares the passwords 
  login() {
    if (this.useremail && this.userpassword) {
      this.http.get<{ fetchedUser: string, msg: string ,userid:string}>(`http://localhost:3000/serviceman/login/${this.useremail}/${this.userpassword}`)
        .subscribe((data) => {
          console.log(data);
          if (data.fetchedUser) {
            console.log('output is'+data.fetchedUser)
            this.confirmation = data.fetchedUser;
            localStorage.setItem("serviceproviderid", this.confirmation._id);
            localStorage.setItem("serviceprovider", JSON.stringify(this.confirmation));
            this.router.navigate(['/serviceproviderhome'], this.navigationExtras);
          }
          else if (data.msg === 'User not found') {
            this.showErrorMessage = true;
            this.errorMsg="Invalid email/password"
          } else if (data.msg === 'Invalid User') {
            this.showErrorMessage = true;
            this.errorMsg="Invalid email/password"
          }
        })
    }
    else
      alert("please enter emailId and password");
  }

  // this funtion routes to the registration page
routeToRegister(){
  this.router.navigate(['/serviceproviderregister']);
}

  // this funtion routes to the login page
routeToUserLogin(){
  this.router.navigate(['/UserLoginPage']);
}

}

