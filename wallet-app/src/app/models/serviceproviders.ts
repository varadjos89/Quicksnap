export class Serviceproviders {
  
    firstname: String;
    lastname: String;
    profession: String;
    email: String;
    address: String;
    city: String;
    zipcode: String;
    password: String;
    
    // declaring constructor for the service provider class
    constructor(firstname: String, lastname: String, profession:String, email:String, address:String, city:String, zipcode:String, password:String) {
        this.firstname= firstname;
        this.lastname= lastname;
        this.profession=profession,
        this.email=email;
        this.address=address
        this.city=city;
        this.zipcode=zipcode;
        this.password=password;
    }
}