export class user {

  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  zipcode: string;
  city: string;
  address: string;
  constructor(FirstName: string, LastName: string, emailId: string ,phone:string, Address: string,
              City: string , Zipcode:  string , password: string, ) {
    this.firstname = FirstName;
    this.lastname = LastName;
    this.email = emailId;
    this.phone=phone;
    this.address = Address;
    this.city = City;
    this.zipcode = Zipcode;
    this.password = password;

}
}
