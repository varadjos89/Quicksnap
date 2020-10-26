import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import {Serviceproviders} from './../models/serviceproviders'
import { ServiceProvider } from '../services/serviceProviderService';
import { Servicerequests } from '../models/servicerequests';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-service-provider-list',
  templateUrl: './service-provider-list.component.html',
  styleUrls: ['./service-provider-list.component.scss']
})
export class ServiceProviderListComponent implements OnInit {

   // serviceproviders : Array<Serviceproviders>
  
  testuser;
  showform :boolean = false;
  profession :string;
  city :string;
  serviceproviders;
  customer = JSON.parse(localStorage.getItem("user"));

  description :string;
  budget :string;
  deadline :string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private Service : ServiceProvider) {
  
    this.route.queryParams.subscribe(params => {
      this.city = params["city"],
      this.profession = params["profession"]
      // this.customer = params["user"]
    });
    console.log(this.customer)

    
  //  this function fetches all the serviceman list from server based on their profesiion and city
    this.http.get(`http://localhost:3000/serviceman/${this.city}/${this.profession}`)
    .subscribe((data) => {
        if (data[0] === undefined) {
        console.log("unable to get");
      }
      else
      { this.serviceproviders = data;
        console.log(this.serviceproviders)
      }
  
    })
   }


  ngOnInit() {
  }

  // this funtion fetches all the servoice provider list from the database and 
  getServiceProviders() {
   return this.Service.getAllServiceProviderByProfessionAndCity(this.city,this.profession);
  }

  // on submit this function will create a new service request and post it to the database
  newServicerequests(){
    console.log(this.customer)
    let newServiceRequest = new Servicerequests(this.customer._id, this.customer.firstname,this.testuser._id,this.testuser.firstname, this.description,this.budget,this.deadline,"pending" );
    console.log(newServiceRequest);
    this.http.post(`http://localhost:3000/servicerequests/`, newServiceRequest )
    .subscribe((data) => {
        if (data[0] === undefined) {
        console.log("Undefine");
      }
      else
      { console.log(data);
        return data;}  
    })
    this.showform=false;
    alert("service request Sent! Go to My Bookings to see more");
  }

  
  //  this function shows the service reqeust form 
  showformtrigger(s){
    this.testuser=s;
    if(this.showform == false){
     this.showform=true;}
     else{
     this.showform=false;}
    }

    
  //  this function routes to the user login page and clears all local storage 
    LogOut(){
      this.router.navigate(['/UserLoginPage'])
      localStorage.removeItem("user");
    }
    
  //  this function routes to the user bookings page
    UserBookings(){
      this.router.navigate(['/userbookings'])
    }

    
  //  this function routes to the user home page
    routeToHome(){
      this.router.navigate(['/userhome'])
    }
}
