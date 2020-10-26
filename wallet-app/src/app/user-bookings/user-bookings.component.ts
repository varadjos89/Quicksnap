import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Servicerequests} from '../models/servicerequests';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  servicerequests;
  user
  pdff:Servicerequests;
  test=false;
  constructor(private route: ActivatedRoute,private router : Router, private http: HttpClient) {

    //  this function gets  all the servicerequests created by a specific user
    this.user=JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    this.http.get(`http://localhost:3000/servicerequests/user/${this.user._id}`)
    .subscribe((data) => {
        if (data[0] === undefined) {
        console.log("Undefined");
      }
      else
      { console.log(data);
        this.servicerequests = data;}
    })

   }

  //  this function updates a specific servicerequest and changes the status to "Paid"
   paid(id){
     this.http.put(`http://localhost:3000/servicerequests/`+id, {status: "Paid"},{ headers: new HttpHeaders().set('Content-Type', 'application/json')})
  .subscribe((data) => {
    if (data[0] === undefined) {
    console.log("Undefine");
  }
  else
  { console.log(data);
    }
})

// this function refreshes the list of service requests
this.http.get(`http://localhost:3000/servicerequests/users/`+this.user._id)
.subscribe((data) => {
 if (data[0] === undefined) {
 console.log("Undefine");
}
else
{ console.log(data);
 this.servicerequests = data;
 window.location.reload();}
})
   }

  ngOnInit() {
  }
  //  this function routes to the userhome page 
  gohome(){
    this.router.navigate(['/userhome'])
  }

  //  this function routes to the user login page and clears all local storage 
  LogOut(){
    this.router.navigate(['/UserLoginPage'])
    localStorage.removeItem("user");
  }

  
  //  this function initializes the data to be printed
  pdfv(SR){
    this.test=true;
this.pdff = SR;

  }

  
  //  this function downloads a PDF
  printt(){
    html2canvas(document.getElementById('results')).then(function(canvas) {
     var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'JPEG',5,20);
      doc.save('billing.pdf');
      });
      this.test=false;
  }

}
