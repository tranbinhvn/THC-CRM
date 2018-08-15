import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CTATypeModel {
    id: string = "";
    name: string = "";
    active: number = 0;
    activeName: string = "";
    constructor (data: ICTATypeModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICTATypeModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class CTATypeCRUDModel {
    id: string = "";
    name: string = "";
    active: number = 0;
    activeName: string = "";
    constructor (data: ICTATypeCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICTATypeCRUDModel {
    id: string;
    name: string;
    active: number;
}

// Api
export class ApiCTATypeModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: CTATypeCRUDModel,userID: number, isCreate: boolean){
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

export class searchCTAType {
    id: string;
    name: string;
    page: number;
    size: number;
}