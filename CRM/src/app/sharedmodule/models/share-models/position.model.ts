import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class PositionModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IPositionModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IPositionModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class PositionCRUDModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IPositionCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IPositionCRUDModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updateBy: number;
}

// Api
export class ApiPositionModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: PositionCRUDModel,userID: number, isCreate: boolean){
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

export class searchPosition {
    id: string;
    name: string;
    page: number;
    size: number;
}