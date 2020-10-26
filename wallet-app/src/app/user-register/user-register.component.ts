import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { userService } from '../services/userService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
// Creating a new component
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserRegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
  password: string;
  newUser: User;
  showAlert = false;
  showError: boolean;
  errorMsg: String;

  constructor(private http: HttpClient, private router: Router) { }
// Here the ngOnInit method is for toggling
  ngOnInit() {
    this.showError = false;
  }
// This method is used for reseting the values

  resetValues() {
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.address = "";
    this.city = "";
    this.zipcode = "";
    this.password = "";
  }
  // This method is written for register User,where the user details are validated based on firstname,last name,email
  registerUser() {
    if (this.validatename(this.firstname, this.lastname) && (this.ValidateEmail(this.email))) {
      this.newUser = new User(this.firstname, this.lastname, this.email, this.address, this.city, this.zipcode, this.password);
      this.http.post<{ msg: string }>(`http://localhost:3000/users/`, this.newUser)
        .subscribe((data) => {
          console.log(data);
          if (data.msg === "Fail") {
            return;
          }
          else if (data.msg === "Success") {
            console.log(data);
            this.showAlert = true;
            this.resetValues();
          }
        })
    }
  }
  // Here routing is provided
  routeToUserLogin() {
    this.router.navigate(['/UserLoginPage']);
  }
// Validation codes for validations
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
