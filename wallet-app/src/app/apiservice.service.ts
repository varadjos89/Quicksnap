import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Servicerequests} from './models/servicerequests';
import { Observable, pipe } from 'rxjs';
import { serviceProviders, s } from '../app/_model/ServiceProvider';

@Injectable()
 export class ServiceProvider {

  resourceString: string;
  resourceURLString: string;
  idServiceProvider: string;
  requestString: string;
  serviceRequestResourceURL :string;
  // declaring the httpClient instance for injection
  constructor(private http: HttpClient) {
    this.resourceString = 'serviceprovider';
     this.requestString = 'requests';
    this.resourceURLString = `${environment.serverBaseURL}/${this.resourceString}`;
    this.serviceRequestResourceURL =`${environment.serverBaseURL}/${this.requestString}`;

    // this.serviceRequestResourceURL = `http://localhost:3000/requests`;
  }
  getservicerequests(): Observable<Array<Servicerequests>> {

    return this.http.get<Array<Servicerequests>>(this.serviceRequestResourceURL);

  }
  registerServiceProvider(servicep: s): Observable<s> {

    let newserviceprovider: s;
    newserviceprovider = servicep ? servicep : new s(servicep.firstname, servicep.lastname,servicep.profession,servicep.email,servicep.address,servicep.city,servicep.zipcode,servicep.password);
    return this.http.post<s>(`${environment.serverBaseURL}/${this.resourceString}`, newserviceprovider);
  }

}
