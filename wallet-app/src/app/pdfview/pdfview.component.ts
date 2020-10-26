import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Pdf generation using htmlcanvas abd jsPDF
@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.scss']
})
export class PdfviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router : Router, private http: HttpClient) { }

  ngOnInit() {
  }
 cc(){
    html2canvas(document.getElementById('results')).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',5,20);
    doc.save('testCanvas.pdf');
    });
  }
  home()
  {
   this.router.navigate(['/userhome']);

  }
}

