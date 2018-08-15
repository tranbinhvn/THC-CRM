import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class ContactModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string;
    address1: string = "";
    address2: string = "";
    email: string = "";
    phone: string = "";
    constructor (data: IContactModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.firstName + " " + this.lastName || "";
        this.address1 = data.address1 || "";
        this.address2 = data.address2 || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
    }
}

export interface IContactModel {
    id: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    phone: string;
}

// Create Update Detail
export class ContactCRUDModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string;
    address1: string = "";
    address2: string = "";
    email: string = "";
    phone: string = "";
    constructor (data: IContactCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.firstName + " " + this.lastName || "";
        this.address1 = data.address1 || "";
        this.address2 = data.address2 || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
    }
}

export interface IContactCRUDModel {
    id: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    phone: string;
}

// Api
export class ApiContactModel {
    id: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    phone: string;
    constructor (data: ContactCRUDModel) {
        if(!data){return}
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address1 = data.address1;
        this.address2 = data.address2;
        this.email = data.email;
        this.phone = data.phone;
    }
}

export class searchContact {
    id: string;
    name: string;
    page: number;
    size: number;
}