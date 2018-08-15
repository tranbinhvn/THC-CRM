export class SendMailModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    email: string = "";
    constructor (data: ISendMailModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.lastName + " " + this.firstName;
        this.email = data.email || "";
    }
}

export interface ISendMailModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

// Create Update Detail
export class SendMailCRUDModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    email: string = "";
    constructor (data: ISendMailCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.lastName + " " + this.firstName;
        this.email = data.email || "";
    }
}

export interface ISendMailCRUDModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

// Api
export class ApiSendMailModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    constructor(data: SendMailCRUDModel,userID: number, isCreate: boolean){
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
    }
}

export class searchSendMail {
    id: string;
    name: string;
    page: number;
    size: number;
}