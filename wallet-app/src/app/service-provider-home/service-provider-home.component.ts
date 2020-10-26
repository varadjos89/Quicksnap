import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-service-provider-home',
  templateUrl: './service-provider-home.component.html',
  styleUrls: ['./service-provider-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceProviderHomeComponent implements OnInit {
 requests;
  serviceprovider = JSON.parse(localStorage.getItem("serviceprovider"));

  constructor(private http: HttpClient,private route: ActivatedRoute,private router : Router ) {
  this.http.get(`http://localhost:3000/servicerequests/serviceman/`+this.serviceprovider._id)
   .subscribe((data) => {
    if (data[0] === undefined) {
    console.log("Undefine");
  }
  else
  { console.log(data);
    this.requests = data;}
})

   }

  ngOnInit() {

  }


// this function changes the service reqeusts status to Accepted
  acceptStatus(id){
    // alert('checking the code')
    this.http.put(`http://localhost:3000/servicerequests/`+id, {status: "Accepted"}, { headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data) => {
      
      if (data[0] === undefined) {
      console.log("Undefined");

    }
    else
    { console.log(data);
      alert("Request has been accepted");
      }
  })
  this.http.get(`http://localhost:3000/servicerequests/serviceman/`+this.serviceprovider._id)
  .subscribe((data) => {
   if (data[0] === undefined) {
   console.log("Undefine");
 }
 else
 { console.log(data);
   this.requests = data;}
})
}

// this function changes the service reqeusts status to Declined
declineStatus(id){
  if(confirm("Do you want to decline this request?")){

  this.http.put(`http://localhost:3000/servicerequests/`+id, {status: "Declined"},{ headers: new HttpHeaders().set('Content-Type', 'application/json')})
  .subscribe((data) => {
    if (data[0] === undefined) {
    console.log("Undefine");

  }
  else
  { console.log(data);
    alert("Request has been Declined")
    }
})
this.http.get(`http://localhost:3000/servicerequests/serviceman/`+this.serviceprovider._id)
.subscribe((data) => {
 if (data[0] === undefined) {
 console.log("Undefine");
}
else
{ console.log(data);
 this.requests = data;
 }
})
  }

}
// this function changes the service reqeusts status to Completed
markCompleted(id){
  this.http.put(`http://localhost:3000/servicerequests/`+id, {status: "Completed"},{ headers: new HttpHeaders().set('Content-Type', 'application/json')})
  .subscribe((data) => {
    if (data[0] === undefined) {
    console.log("Undefine");

  }
  else
  { console.log(data);
    alert("Request has been Completed");

    }
})
this.http.get(`http://localhost:3000/servicerequests/serviceman/`+this.serviceprovider._id)
.subscribe((data) => {
 if (data[0] === undefined) {
 console.log("Undefine");
}
else
{ console.log(data);
 this.requests = data;}
})
}


LogOut(){
  this.router.navigate(['/serviceproviderlogin'])
  localStorage.removeItem("serviceprovider");
}

}
