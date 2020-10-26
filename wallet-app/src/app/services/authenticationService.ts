import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable()
export class authenticationService {
  constructor(private http: HttpClient) { }
    public getLoggingInTime = new Subject();
    loginServiceProvider(username: string, password: string) {
      return this.http.post<any>(`${environment.serverBaseURL}/serviceman/login`, { username : username, password: password })
          .pipe(map(serviceproviderr => {
               if (serviceproviderr && serviceproviderr.token) {
                   localStorage.setItem('usertoken', JSON.stringify(serviceproviderr));
                  this.getLoggingInTime.next('LoggedIn');
              }
              return serviceproviderr;
          }));
  }

    }


