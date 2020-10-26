import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-provider-header',
  templateUrl: './service-provider-header.component.html',
  styleUrls: ['./service-provider-header.component.scss']
})
export class ServiceProviderHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  LogOut() {
    this.router.navigate(['/serviceproviderlogin'])
    localStorage.removeItem("serviceproviders");
  }
  Serviceproviderprofile() {
    this.router.navigate(['/serviceproviderprofile'])
  }
}
