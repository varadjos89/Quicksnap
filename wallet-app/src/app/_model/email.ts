// This ts file is creating as a model for contents of email
export class EmailSend {

  to:String;
  from:String;
  subject:String;
  body:String;

  constructor( to:String, from:String,subject:String ,body:String ) {
this.to=to;
this.from=from;
this.subject=subject;
this.body=body;

}
}
