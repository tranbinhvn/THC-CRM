import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CTAReasonModel {
    id: string = "";
    name: string = "";
    active: number = 0;
    activeName: string = "";
    constructor (data: ICTAReasonModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICTAReasonModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class CTAReasonCRUDModel {
    id: string = "";
    name: string = "";
    active: number = 0;
    activeName: string = "";
    constructor (data: ICTAReasonModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICTAReasonCRUDModel {
    id: string;
    name: string;
    active: number;
}

// Api
export class ApiCTAReasonModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: CTAReasonCRUDModel,userID: number, isCreate: boolean){
        this.id = data.id;
        this.name = data.name;
        this.active = data.active;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchCTAReason {
    id: string;
    name: string;
    page: number;
    size: number;
}