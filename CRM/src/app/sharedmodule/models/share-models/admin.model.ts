import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class AdminModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    email: string = "";
    employeeId: string = "";
    password: string = "";
    status: number = 0;
    statusName: string;
    constructor (data: IAdminModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.lastName + " " + this.firstName || "";
        this.email = data.email || "";
        this.employeeId = data.employeeId || "";
        this.password = data.password || "";
        this.status = data.status;
        this.statusName = ContantValues.STATUS_LOCK_ITEM.find(s=>{return s.key == this.status}).value || "Không hiệu lực"
    }
}

export interface IAdminModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    employeeId: string;
    password: string;
    status: number;
}

// Create Update Detail
export class AdminCRUDModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    email: string = "";
    employeeId: string = "";
    password: string;
    status: number = 0;
    statusName: string;
    constructor (data: IAdminCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.fullName = this.lastName + " " + this.firstName || "";
        this.email = data.email || "";
        this.employeeId = data.employeeId || "";
        this.password = data.password || "";
        this.status = data.status;
        this.statusName = ContantValues.STATUS_LOCK_ITEM.find(s=>{return s.key == this.status}).value || "Không hiệu lực";
    }
}

export interface IAdminCRUDModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    employeeId: string;
    password: string;
    status: number;
}

// Api
export class ApiAdminModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    employeeId: string;
    password: string;
    status: number;
    constructor (data: AdminCRUDModel) {
        if(!data){return}
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.employeeId = data.employeeId;
        this.password = data.password;
        this.status = data.status;
    }
}

export class searchAdmin {
    id: string;
    name: string;
    page: number;
    size: number;
}