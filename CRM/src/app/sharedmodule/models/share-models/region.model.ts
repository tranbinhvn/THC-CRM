import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class RegionModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IRegionModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IRegionModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class RegionCRUDModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IRegionCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IRegionCRUDModel {
    id: string;
    name: string;
    active: number;
}

// Api
export class ApiRegionModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: RegionCRUDModel,userID: number, isCreate: boolean){
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

export class searchRegion {
    id: string;
    name: string;
    page: number;
    size: number;
}