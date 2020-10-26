import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserLoginPageComponent implements OnInit {

  email: string;
  password: string;
  confirmation;
  navigationExtras: NavigationExtras = {
    queryParams: {
      "user": this.confirmation,

    }
  }
  showErrorMessage: boolean;
  errorMsg:String;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.showErrorMessage = false;
  }
  login() {
    if (this.email && this.password) {
      this.http.get<{ fetchedUser: string,msg: string, userid:string }>(`http://localhost:3000/users/login/${this.email}/${this.password}`)
        .subscribe((data) => {
          if (data.fetchedUser) {
            this.confirmation=data.fetchedUser;
            localStorage.setItem("user",JSON.stringify(this.confirmation));
            localStorage.setItem("userid",JSON.stringify(data.userid));
            this.router.navigate(['/userhome'], this.navigationExtras);
          }
          else if (data.msg === 'User not found') {
            this.showErrorMessage = true;
            this.errorMsg="Invalid email/password"
          } else if (data.msg === 'Invalid User') {
            this.showErrorMessage = true;
            this.errorMsg="Invalid email/password"
          }
        })
    }
    else
      alert("please enter emailId and password");
  }

  routeToUserRegisterPage() {
    this.router.navigate(['/userRegisterPage'])
  }
  routeToServiceProviderLogin() {
    this.router.navigate(['/serviceproviderlogin'])
  }
  forgotpp()
  {
    this.router.navigate(['/forgotpassword'])
  }
}
