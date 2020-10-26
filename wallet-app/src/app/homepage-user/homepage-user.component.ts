import { Component, OnInit, } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceProvider } from '../services/serviceProviderService';
import { User } from '../models/user';

@Component({
  selector: 'app-homepage-user',
  templateUrl: './homepage-user.component.html',
  styleUrls: ['./homepage-user.component.scss']
})
export class HomepageUserComponent implements OnInit {

   // profession :string;
   SearchInCity :string;
   serviceproviders ;
   user = JSON.parse(localStorage.getItem("user"));

  constructor(private route: ActivatedRoute,private router : Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      // this.user = params["user"]
    });
    console.log(this.user);
   }

  ngOnInit() {
    this.SearchInCity = "Boston";
  }

  serviceproviderlist ;

    // this funtion routes to the list of service providers based onthe service & city chosen
  routeToServiceproviderList(prof){

    var profession = prof;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "city": this.SearchInCity,
        "profession": profession,
        "user" :this.user
      }
    }

    this.router.navigate(['/viewserviceproviderlist'], navigationExtras);

}


  }


