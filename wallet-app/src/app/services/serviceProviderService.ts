import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Servicerequests} from './../models/servicerequests';
import { Observable, pipe } from 'rxjs';
import { serviceProviders, s } from './../../app/_model/ServiceProvider';

@Injectable()
 export class ServiceProvider {

  resourceString: string;
  resourceURLString: string;
  idServiceProvider: string;
  requestString: string;
  getservicemanByProfession: string;
  serviceRequestResourceURL :string;
  getServiceRequestbyServicemanId :string;

  // declaring the httpClient instance for injection
  constructor(private http: HttpClient) {
    this.resourceString = 'serviceman/';
    this.requestString = 'requests';
    this.getservicemanByProfession = 'serviceman/profession/';
    this.getServiceRequestbyServicemanId = 'servicerequests/user/';
    this.resourceURLString = `${environment.serverBaseURL}/${this.resourceString}`;
    this.serviceRequestResourceURL =`${environment.serverBaseURL}/${this.requestString}`;

    // this.serviceRequestResourceURL = `http://localhost:3000/requests`;
  }
  registerServiceProvider(servicep: s): Observable<s> {

    let newserviceprovider: s;
    newserviceprovider = servicep ? servicep : new s(servicep.firstname,servicep.lastname,servicep.profession,servicep.email,servicep.address,servicep.city,servicep.zipcode,servicep.password);
    return this.http.post<s>(`${environment.serverBaseURL}/${this.resourceString}`, newserviceprovider);
  }
  getservicerequests(): Observable<Array<Servicerequests>> {

    return this.http.get<Array<Servicerequests>>(this.serviceRequestResourceURL);

  }
// this function will get all the servieproviders filtering them by profession
  getAllServiceProviderByProfession(profession :String) {
    this.http.get(`${environment.serverBaseURL}/${this.getservicemanByProfession}`+profession)
    .subscribe((data) => {
        if (data[0] === undefined) {
        console.log("Undefine");
      }
      else
      { console.log(data);
        return data;}

    })
  }



 // this function will get all the servieproviders filtering them by city and profession
 getAllServiceProviderByProfessionAndCity(city:string , profession :String) {
  this.http.get(`${environment.serverBaseURL}/${this.resourceString}/${city}/`+profession)
  .subscribe((data) => {
      if (data[0] === undefined) {
      console.log("Undefine");
    }
    else
    { console.log(data);
      return data;}

  })
}
  //  this function will create a new servicerequest and post it to the api

  createAndPostAServiceRequest(servicerequest :Servicerequests) :Observable<Servicerequests>{
    let newServiceRequest : Servicerequests;
    newServiceRequest = servicerequest ? servicerequest : new Servicerequests(servicerequest.userId, servicerequest.username, servicerequest.servicemanId,servicerequest.servicemanname,servicerequest.description,servicerequest.budget,servicerequest.deadline,servicerequest.status);
    return this.http.post<Servicerequests>(`${environment.serverBaseURL}/${this.requestString}/`, newServiceRequest);
  }

  getServiceProviders(servicemanId){
    this.http.get(`${environment.serverBaseURL}/${this.getServiceRequestbyServicemanId}` + servicemanId)
      .subscribe((data) => {
        return data;
        })
  }
}
