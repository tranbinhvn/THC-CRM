import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CTAModel {
    id: string = "";
    subject: string = "";
    descript: string = "";
    lostCost: number = 0;
    dueDate: string;
    adminFirstName: string = "";
    adminLastName: string = "";
    fullNameAdmin: string = "";
    ctaReasonName: string = "";
    ctaStatusName: string = "";
    ctaTypeName: string = "";
    customerName: string = "";
    ctaPriorityName: string = "";
    constructor (data: ICTAModel) {
        if(!data){return}
        this.id = data.id || "";
        this.subject = data.subject || "";
        this.descript = data.descript || "";
        this.lostCost = data.lostCost || 0;
        this.dueDate = data.dueDate || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdmin = this.adminLastName + " " + this.adminFirstName || "";
        this.ctaReasonName = data.ctaReasonName || "";
        this.ctaStatusName = data.ctaStatusName || "";
        this.ctaTypeName = data.ctaTypeName || "";
        this.customerName = data.customerName || "";
        this.ctaPriorityName = data.ctaPriorityName || "";
    }
}

export interface ICTAModel {
    id: string;
    subject: string;
    descript: string;
    lostCost: number;
    attachment: string;
    dueDate: string;
    adminId: number;
    adminFirstName: string;
    adminLastName: string;
    ctaReasonId: number;
    ctaReasonName: string;
    ctaStatusId: number;
    ctaStatusName: string;
    ctaTypeId: number;
    ctaTypeName: string;
    customerId: number;
    customerName: string;
    ctaPriorityId: number;
    ctaPriorityName: string;
}

// Create Update Detail
export class CTACRUDModel {
    id: string = "";
    subject: string = "";
    descript: string = "";
    lostCost: number = 0;
    dueDate: string ="";    
    attachment: string = "";
    adminId: number = 0;
    adminFirstName: string = "";
    adminLastName: string = "";
    fullNameAdmin: string = "";
    ctaReasonId: number = 0;
    ctaReasonName: string = "";
    ctaStatusId: number = 0;
    ctaStatusName: string = "";
    ctaTypeId: number = 0;
    ctaTypeName: string = "";
    customerId: number = 0;
    customerName: string = "";
    ctaPriorityId: number = 0;
    ctaPriorityName: string = "";
    constructor (data: ICTACRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.subject = data.subject || "";
        this.descript = data.descript || "";
        this.dueDate = data.dueDate || "";
        this.lostCost = data.lostCost || 0;
        this.attachment = data.attachment || "";
        this.adminId = data.adminId || 0;
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdmin = this.adminLastName + " " + this.adminFirstName || "";
        this.ctaReasonId = data.ctaReasonId || 0;
        this.ctaReasonName = data.ctaReasonName || "";
        this.ctaStatusId = data.ctaStatusId || 0;
        this.ctaStatusName = data.ctaStatusName || "";
        this.ctaTypeId = data.ctaTypeId || 0;
        this.ctaTypeName = data.ctaTypeName || "";
        this.customerId = data.customerId || 0;
        this.customerName = data.customerName || "";
        this.ctaPriorityId = data.ctaPriorityId || 0;
        this.ctaPriorityName = data.ctaPriorityName || "";
    }
}

export interface ICTACRUDModel {
    id: string;
    subject: string;
    descript: string;
    lostCost: number;
    dueDate: string;    
    attachment: string;
    adminId: number;
    adminFirstName: string;
    adminLastName: string;
    ctaReasonId: number;
    ctaReasonName: string;
    ctaStatusId: number;
    ctaStatusName: string;
    ctaTypeId: number;
    ctaTypeName: string;
    customerId: number;
    customerName: string;
    ctaPriorityId: number;
    ctaPriorityName: string;
}

// Api
export class ApiCTAModel {
    id: string;
    subject: string;
    descript: string;
    lostCost: number;
    dueDate: string; 
    attachment: string;
    adminId: number;
    ctaReasonId: number;
    ctaStatusId: number;
    ctaTypeId: number;
    customerId: number;
    ctaPriorityId: number;
    createdBy: number;
    updatedBy: number;
    constructor (data: CTACRUDModel,userID: number, isCreate: boolean) {
        this.id = data.id;
        this.subject = data.subject;
        this.descript = data.descript;
        this.lostCost = data.lostCost;
        this.dueDate = data.dueDate;
        this.attachment = data.attachment;
        this.adminId = data.adminId;
        this.ctaReasonId = data.ctaReasonId;
        this.ctaStatusId = data.ctaStatusId;
        this.ctaTypeId = data.ctaTypeId;
        this.customerId = data.customerId;
        this.ctaPriorityId = data.ctaPriorityId;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchCTA {
    id: string;
    name: string;
    page: number;
    size: number;
}