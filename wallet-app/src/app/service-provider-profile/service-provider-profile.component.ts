import { Component, OnInit } from '@angular/core';
import { Serviceproviders } from '../models/serviceproviders';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.component.html',
  styleUrls: ['./service-provider-profile.component.scss']
})
export class ServiceProviderProfileComponent implements OnInit {

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
  id: String;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.showError = false;
    this.id=localStorage.getItem("serviceproviderid");
    this.getUser();
  }
  getUser(){
    this.http.get<{ firstname: string, lastname: string, email: string, address: string, city: string, zipcode: string ,profession:string}>(`http://localhost:3000/serviceman/${this.id}`)
      .subscribe((data) => {
        this.firstname = data.firstname;
        this.lastname=data.lastname;
        this.email=data.email;
        this.address=data.address;
        this.zipcode=data.zipcode;
        this.city=data.city;
        this.profession=data.profession
      })
  }

  routeToHomePage(){
    this.router.navigate(['/serviceproviderhome']);
  }

  updateUser(){
    if (this.firstname && this.lastname && this.email && this.password && this.profession && this.zipcode && this.city && this.address) {
      if (this.validatename(this.firstname, this.lastname) && (this.ValidateEmail(this.email))) {
        this.newServiceProvider = new Serviceproviders(this.firstname, this.lastname, this.profession, this.email, this.address, this.city, this.zipcode, this.password);
        this.http.put<{ msg: string }>(`http://localhost:3000/serviceman/${this.id}`, this.newServiceProvider)
          .subscribe((data) => {
            this.showAlert = true;
            this.router.navigate(['/serviceproviderprofile']);
          })

      }
      else
        alert("please fill all the fields");
    }
  }
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
