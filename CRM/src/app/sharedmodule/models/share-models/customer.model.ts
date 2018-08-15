import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CustomerModel {
    id: string = "";
    name: string = "";
    displayName: string = "";
    address: string = "";
    phone: string = "";
    email: string = "";
    statusName: string = "";
    constructor (data: ICustomerModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.displayName = data.displayName || "";
        this.address = data.address || "";
        this.phone = data.phone || "";
        this.email = data.email || "";
        this.statusName = data.statusName || "";
    }
}

export interface ICustomerModel {
    id: string;
    name: string;
    displayName: string;
    address: string;
    phone: string;
    email: string;
    statusName: string;
}

// Create Update Detail
export class CustomerCRUDModel {
    id: string = "";
    name: string = "";
    displayName: string = "";
    address: string = "";
    phone: string = "";
    email: string = "";
    parentId: string = "";
    statusId: string = "";
    statusName: string = "";
    constructor (data: ICustomerCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.displayName = data.displayName || "";
        this.address = data.address || "";
        this.phone = data.phone || "";
        this.email = data.email || "";
        this.parentId = data.parentId || "";
        this.statusId = data.statusId || "";
        this.statusName = data.statusName || "";
    }
}

export interface ICustomerCRUDModel {
    id: string;
    name: string;
    displayName: string;
    address: string;
    phone: string;
    email: string;
    parentId: string;
    statusId: string;
    statusName: string;
}

// Api
export class ApiCustomerModel {
    id: string;
    name: string;
    displayName: string;
    address: string;
    phone: string;
    email: string;
    parentId: string;
    statusId: string;
    constructor(data: CustomerCRUDModel){
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.parentId = data.parentId;
        this.statusId = data.statusId;
    }
}

export class searchCustomer {
    id: string;
    name: string;
    page: number;
    size: number;
}