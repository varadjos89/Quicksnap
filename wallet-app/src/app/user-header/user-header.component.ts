import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  LogOut() {
    this.router.navigate(['/UserLoginPage'])
    localStorage.removeItem("user");
  }

  UserBookings() {
    this.router.navigate(['/userbookings'])
  }
  routeToContactUs() {
    this.router.navigate(['/contactus']);
  }
  UserProfile() {
    this.router.navigate(['/userProfile']);
  }
  homepage(){
    this.router.navigate(['/userhome']);
  }

}
