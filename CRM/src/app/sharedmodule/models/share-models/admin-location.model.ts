import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class AdminLocationModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    countryName: string = "";
    regionName: string = "";
    adminFirstName: string = "";
    adminLastName: string = "";
    fullNameAdmin: string = "";
    constructor (data: IAdminLocationModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.countryName = data.countryName || "";
        this.regionName = data.regionName || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdmin = this.adminLastName + " " + this.adminFirstName || "";
    }
}

export interface IAdminLocationModel {
    id: string;
    startDate: string;
    endDate: string;
    countryId: string;
    countryName: string;
    regionId: string;
    regionName: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
}

// Create Update Detail
export class AdminLocationCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    countryId: string;
    countryName: string;
    regionId: string;
    regionName: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    fullNameAdmin: string;
    constructor (data: IAdminLocationCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.countryId = data.countryId || "";
        this.countryName = data.countryName || "";
        this.regionId = data.regionId || "";
        this.regionName = data.regionName || "";
        this.adminId = data.adminId || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdmin = this.adminLastName + " " + this.adminFirstName || "";
    }
}

export interface IAdminLocationCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    countryId: string;
    countryName: string;
    regionId: string;
    regionName: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    createdBy: number;
    updateBy: number;
}

// Api
export class ApiAdminLocationModel {
    id: string;
    startDate: string;
    endDate: string;
    countryId: string;
    regionId: string;
    adminId: string;
    createdBy: number;
    updatedBy: number;
    constructor (data: AdminLocationCRUDModel,userID: number, isCreate: boolean) {
        if(!data){return}
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.countryId = data.countryId;
        this.regionId = data.regionId;
        this.adminId = data.adminId;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchAdminLocation {
    id: string;
    name: string;
    page: number;
    size: number;
}