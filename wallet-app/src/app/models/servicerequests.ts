export class Servicerequests {

    // declaring constructor for the servicerequest class
    constructor(
      public userId: string,
      public username : string,
      public servicemanId: string,
      public servicemanname: string,
      public description: string,
      public budget: string,
      public deadline: string,
      public status: string,
    ) {  }
}