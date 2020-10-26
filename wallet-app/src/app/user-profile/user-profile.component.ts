import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
  password: string;
  newUser: User;
  id: String;
  showAlert = false;
  showError: boolean;
  errorMsg: String;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {  
    this.id = localStorage.getItem("userid").replace(/['"]+/g, '');
    this.getUser(this.id);
    this.showError = false;
  }

  getUser(id:String) {
    this.http.get<{ firstname: string, lastname: string, email: string, address: string, city: string, zipcode: string }>(`http://localhost:3000/users/${id}`)
      .subscribe((data) => {
        this.firstname = data.firstname;
        this.lastname=data.lastname;
        this.email=data.email;
        this.address=data.address;
        this.zipcode=data.zipcode;
        this.city=data.city;
      })
  }
  updateUser(){
    if (this.validatename(this.firstname, this.lastname) && (this.ValidateEmail(this.email))) {
      this.newUser = new User(this.firstname, this.lastname, this.email, this.address, this.city, this.zipcode, this.password);
      this.http.put<{ msg: string }>(`http://localhost:3000/users/${this.id}`, this.newUser)
        .subscribe((data) => {
            this.showAlert = true;
            this.router.navigate(['/userProfile']);
        })
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
