import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { EmailSend } from '../_model/email';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
// A ContactUsComponent to send msg to QuickSnap
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  to: string;
  bodymsg: string;
  msg: string;
  emaill: string;
  newEmail: EmailSend;

  constructor(private http: HttpClient,private route: ActivatedRoute,private router : Router) { }

  ngOnInit() {
  }
  // Method for resetting
  resett(){
    this.bodymsg = '',
    this.msg = '';
  }
// Method for sending email to meancoders mail using nodemailer
  sendEmaill()
  {
    // this.http.get(`http://localhost:3000/users/email/${this.emaill}`)
    // .subscribe((data) => {
    //   console.log(data);
    //   alert('Email sent');

    //   if (data[0] === undefined) {
    //     const options = {
    //       overlay: true,
    //       overlayClickToClose: true,
    //       showCloseButton: true,
    //       duration: 5000
    //     };

    //   }
    //   else{
        const emailDetails = {
          to: 'meancoders4@gmail.com',
          subject: 'Weclome to QuickSnap',
          text: 'Subject:' + this.msg + '\n'+ '\n' + 'Message:' + this.bodymsg,
        }

        this.http.post(`http://localhost:3000/emails/${this.emaill}`, emailDetails)
          .subscribe((data) => {
            this.resett();
            console.log(data)

          })
          
          alert('Email sent');
        const options = {
          showCloseButton: true,
          overlay: true,
          overlayClickToClose: true,
          duration: 5000
        };

    //   }
    // })
  }
// To navigate to homepage based on the user click

  Homepage()
  {
    this.router.navigate(['/userhome'])
  }



}


