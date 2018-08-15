// List
export class CustomerAssignmentModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    adminFirstName: string = "";
    adminLastName: string = "";
    fullName: string = "";
    customerName: string = "";
    constructor (data: ICustomerAssignmentModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullName = this.adminFirstName + " " + this.adminLastName || "";
        this.customerName = data.customerName || "";
    }
}

export interface ICustomerAssignmentModel {
    id: string;
    startDate: string;
    endDate: string;
    adminFirstName: string;
    adminLastName: string;
    customerName: string;
}

// Create Update Detail
export class CustomerAssignmentCRUDModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    adminId: string = "";
    adminFirstName: string = "";
    adminLastName: string = "";
    fullName: string = "";
    customerId: string = "";
    customerName: string = "";
    constructor (data: ICustomerAssignmentCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminId = data.adminId || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullName = this.adminLastName + this.adminFirstName || "";
        this.customerId = data.customerId || "";
        this.customerName = data.customerName || "";
    }
}

export interface ICustomerAssignmentCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    customerId: string;
    customerName: string;
}

// Api
export class ApiCustomerAssignmentModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    customerId: string;
    constructor(data: CustomerAssignmentCRUDModel){
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.adminId = data.adminId;
        this.customerId = data.customerId;
    }
}

export class searchCustomerAssignment {
    id: string;
    name: string;
    page: number;
    size: number;
}