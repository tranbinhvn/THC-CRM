import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class AdminMarketLevelModel {
    id: string = "";
    startDate: Date;
    endDate: Date;
    adminFirstName: string = "";
    adminLastName: string = "";
    fullNameAdMarLev: string = "";
    marketLevelName: string = "";
    constructor (data: IAdminMarketLevelModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || null;
        this.endDate = data.endDate || null;
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdMarLev = this.adminLastName + " " + this.adminFirstName || "";
        this.marketLevelName = data.marketLevelName || "";
    }
}

export interface IAdminMarketLevelModel {
    id: string;
    startDate: Date;
    endDate: Date;
    adminFirstName: string;
    adminLastName: string;
    marketLevelName: string;
}

// Create Update Detail
export class AdminMarketLevelCRUDModel {
    id: string;
    startDate: Date;
    endDate: Date;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    fullNameAdMarLev: string = "";
    marketLevelId: string;
    marketLevelName: string;
    constructor (data: IAdminMarketLevelCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || null;
        this.endDate = data.endDate || null;
        this.adminId = data.adminId || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdMarLev = this.adminLastName + " " + this.adminFirstName || "";
        this.marketLevelId = data.marketLevelId || "";
        this.marketLevelName = data.marketLevelName || "";
    }
}

export interface IAdminMarketLevelCRUDModel {
    id: string;
    startDate: Date;
    endDate: Date;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    marketLevelId: string;
    marketLevelName: string;
}

// Api
export class ApiAdminMarketLevelModel {
    id: string;
    startDate: Date;
    endDate: Date;
    adminId: string;
    marketLevelId: string;
    createdBy: number;
    updatedBy: number;
    constructor (data: AdminMarketLevelCRUDModel,userID: number, isCreate: boolean) {
        if(!data){return}
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.adminId = data.adminId;
        this.marketLevelId = data.marketLevelId;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchAdminMarketLevel {
    id: string;
    name: string;
    page: number;
    size: number;
}