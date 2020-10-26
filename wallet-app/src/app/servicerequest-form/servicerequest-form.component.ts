import { Component, OnInit } from '@angular/core';
import { serviceProviders } from '../_model/ServiceProvider';
import { FormGroup, FormControl } from '@angular/forms';
import {Servicerequests} from './../models/servicerequests'

@Component({
  selector: 'app-servicerequest-form',
  templateUrl: './servicerequest-form.component.html',
  styleUrls: ['./servicerequest-form.component.scss']
})
export class ServicerequestFormComponent implements OnInit {


  constructor() { }
  submitted = false;
  valid = false;
  
  ngOnInit() {
  }

  testuser = {
    _id : "134654asfagadgag",
    firstname : "TestUser",
    lastname : " Random",
  }

  testserviceman = {
    _id : "134654asfagadgag",
    firstname : "TestServiceman",
    lastname : "Deepak",
  }

  model : Servicerequests;
 

 
  onSubmit() { this.submitted = true; }
 
  newServicerequests() {
    this.model = new Servicerequests('','','','','','','','');
  }

}
