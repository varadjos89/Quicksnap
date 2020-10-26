
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Observable, pipe } from 'rxjs';
import { user } from './../../app/_model/user';

@Injectable()
 export class  userService {

  resourceString: string;
  resourceURLString: string;
  idServiceProvider: string;
  requestString: string;


  // declaring the httpClient instance for injection
  constructor(private http: HttpClient) {
    this.resourceString = 'user/';
  }
  registerUser(userrr: user): Observable<user> {

    let newuser: user;
    newuser = userrr ? userrr : new user(userrr.firstname,userrr.lastname,userrr.email,userrr.phone,userrr.address,userrr.city,userrr.zipcode,userrr.password);
    return this.http.post<user>(`${environment.serverBaseURL}/${this.resourceString}`, newuser);
  }




}

