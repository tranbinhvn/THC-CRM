import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class TicketModel {
    id: string = "";
    subject: string = "";
    active: number = 0;
    activeName: string;
    contactFirstName: string = "";
    contactLastName: string = "";
    fullNameContact: string;
    contactName: string = "";
    customerName: string = "";
    productName: string = "";
    ticketTypeName: string = "";
    constructor (data: ITicketModel) {
        if(!data){return}
        this.id = data.id || "";
        this.subject = data.subject || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "";
        this.contactFirstName = data.contactFirstName;
        this.contactLastName = data.contactLastName;
        this.fullNameContact = this.contactFirstName + " " + this.contactLastName || "";
        this.customerName = data.customerName || "";
        this.productName = data.productName || "";
        this.ticketTypeName = data.ticketTypeName || "";
    }
}

export interface ITicketModel {
    id: string;
    subject: string;
    active: number;
    contactFirstName: string;
    contactLastName: string;
    customerName: string;
    productName: string;
    ticketTypeName: string;
}

// Create Update Detail
export class TicketCRUDModel {
    id: string = "";
    subject: string = "";
    active: number = 0;
    activeName: string = "";
    contactId: string = "";
    contactFirstName: string = "";
    contactLastName: string = "";
    fullNameContact : string = "";
    customerId: string = "";
    customerName: string = "";
    productId: string = "";
    productName: string = "";
    ticketTypeId: string = "";
    ticketTypeName: string = "";
    constructor (data: ITicketCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.id = data.id || "";
        this.subject = data.subject || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "";
        this.contactId = data.contactId || "";
        this.contactFirstName = data.contactFirstName;
        this.contactLastName = data.contactLastName;
        this.fullNameContact = this.contactFirstName + " " + this.contactLastName || "";
        this.customerId = data.customerId || "";
        this.customerName = data.customerName || "";
        this.productId = data.productId || "";
        this.productName = data.productName || "";
        this.ticketTypeId = data.ticketTypeId || "";
        this.ticketTypeName = data.ticketTypeName || "";
    }
}

export interface ITicketCRUDModel {
    id: string;
    subject: string;
    active: number;
    contactId: string;
    contactFirstName: string;
    contactLastName: string;
    customerId: string;
    customerName: string;
    productId: string;
    productName: string;
    ticketTypeId: string;
    ticketTypeName: string;
}

// Api
export class ApiTicketModel {
    id: string;
    subject: string;
    active: number;
    contactId: string;
    customerId: string;
    productId: string;
    ticketTypeId: string;
    constructor(data: TicketCRUDModel){
        this.id = data.id;
        this.subject = data.subject;
        this.active = data.active;
        this.contactId = data.contactId;
        this.customerId = data.customerId;
        this.productId = data.productId;
        this.ticketTypeId = data.ticketTypeId;
    }
}

export class searchTicket {
    id: string;
    name: string;
    page: number;
    size: number;
}