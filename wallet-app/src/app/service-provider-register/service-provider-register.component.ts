import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Serviceproviders } from './../models/serviceproviders';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Service provider component is created
@Component({
  selector: 'app-service-provider-register',
  templateUrl: './service-provider-register.component.html',
  styleUrls: ['./service-provider-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceProviderRegisterComponent implements OnInit {
  firstname: string;
  lastname: string;
  profession: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
  password: string;
  newServiceProvider: Serviceproviders;
  showAlert = false;
  showError: boolean;
  errorMsg: String;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.showError = false;
  }
// Posting the data to db based on the service provider details
  postContact() {
    if (this.firstname && this.lastname && this.email && this.password && this.profession && this.zipcode && this.city && this.address) {
      if (this.validatename(this.firstname, this.lastname) && (this.ValidateEmail(this.email))) {
        this.newServiceProvider = new Serviceproviders(this.firstname, this.lastname, this.profession, this.email, this.address, this.city, this.zipcode, this.password);
        console.log(this.newServiceProvider);
        this.http.post<{ msg: string }>(`http://localhost:3000/serviceman/`, this.newServiceProvider)
          .subscribe((data) => {
            console.log(data);
            if (data.msg === "Fail") {
              return;
            }
            else if (data.msg === "Success") {
              console.log(data);
              this.showAlert = true;
            }
          })

      }
      else
        alert("please fill all the fields");
    }
  }
// Routing the service provider to his login page based on click of the button
routeToServiceproviderLogin() {
    this.router.navigate(['/serviceproviderlogin']);
  }

// Here validations for first name,last name and number is provided for servicman details
  validatename(fname, lname) {
    if (/^[a-z ,.'-]+$/i.test(fname) && /^[a-z ,.'-]+$/i.test(lname)) {
      return (true)
    } else {
      this.showError = true;
      this.errorMsg = "Invalid Name";
      return (false)
    }
  }
  validatenumber(num) {
    if (/^\d{10}$/i.test(num)) {
      return (true)
    }
    this.showError = true;
    this.errorMsg = "Invalid Phone Number";
    return (false)
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    this.showError = true;
    this.errorMsg = "Invalid Email";
    return (false)
  }

}
