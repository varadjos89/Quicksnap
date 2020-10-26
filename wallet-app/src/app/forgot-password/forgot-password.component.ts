import { Component, OnInit } from '@angular/core';
import { EmailSend } from '../_model/email';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emaill : string ;
  newEmail: EmailSend;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  // Code for sending email when the user forgets password
  sendEmaill()
  {
    this.http.get(`http://localhost:3000/users/email/${this.emaill}`)
    .subscribe((data) => {
      console.log(data);
      if (data[0] === undefined) {
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };

      }
      else{
        
        const emailDetails = {
          to: this.emaill,
          subject: 'Weclome to QuickSnap',
          text: 'Your password is ' + data[0].password,
        }
        console.log(data[0].password);

        this.http.post(`http://localhost:3000/emails/${this.emaill}`, emailDetails)
          .subscribe((data) => {
            console.log(data)
          })
        const options = {
          showCloseButton: true,
          overlay: true,
          overlayClickToClose: true,
          duration: 5000
        };

      }
    })
  }
}
