// The main service provider schema to bind it to the backend api
export class s {

  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  profession: string;
  email: string;
  zipcode: string;
  city: string;
  address: string;
  constructor(FirstName: string, LastName: string, profession: string, emailId: string , Address: string,
              City: string , Zipcode:  string , password: string) {
    this.firstname = FirstName;
    this.lastname = LastName;
    this.profession = profession;
    this.email = emailId;
    this.address = Address;
    this.city = City;
    this.zipcode = Zipcode;
    this.password = password;
}
}

export class serviceProviders{
  _id: String;
  password: string;
  FirstName: string;
  LastName: string;
  phoneNumber: string;
  profession: string;
  emailId: string;
  Zipcode: string;
  City: string;
  Address: string;
  constructor(  _id: string,FirstName: string, LastName: string, emailId: string, Zipcode: string ,
              City: string , Address: string , phoneNumber: string , profession: string) {
    this._id = _id;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.emailId = emailId;
    this.Zipcode = Zipcode;
    this.City = FirstName;
    this.Address = LastName;
    this.phoneNumber = emailId;
    this.profession = Zipcode;
}

}
