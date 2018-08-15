import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class MarketLevelModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IMarketLevelModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IMarketLevelModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class MarketLevelCRUDModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IMarketLevelCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IMarketLevelCRUDModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
}

// Api
export class ApiMarketLevelModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: MarketLevelCRUDModel,userID: number, isCreate: boolean){
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

export class searchMarketLevel {
    id: string;
    name: string;
    page: number;
    size: number;
}