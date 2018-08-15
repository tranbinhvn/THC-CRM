import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class AdminPositionModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    adminFirstName: string = "";
    adminLastName: string = "";
    fullAdPositon: string = "";
    positionName: string = "";
    constructor (data: IAdminPositionModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullAdPositon = this.adminLastName + " " + this.adminFirstName || "";
        this.positionName = data.positionName || "";
    }
}

export interface IAdminPositionModel {
    id: string;
    startDate: string;
    endDate: string;
    adminFirstName: string;
    adminLastName: string;
    positionName: string;
}

// Create Update Detail
export class AdminPositionCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    fullAdPositon: string;
    positionId: string;
    positionName: string;
    constructor (data: IAdminPositionCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminId = data.adminId || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullAdPositon = this.adminLastName + " " + this.adminFirstName || "";
        this.positionId = data.positionId || "";
        this.positionName = data.positionName || "";
    }
}

export interface IAdminPositionCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    positionId: string;
    positionName: string;
    createdBy: number;
    updateBy: number;
}

// Api
export class ApiAdminPositionModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    positionId: string;
    createdBy: number;
    updatedBy: number;
    constructor (data: AdminPositionCRUDModel,userID: number, isCreate: boolean) {
        if(!data){return}
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.adminId = data.adminId;
        this.positionId = data.positionId;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchAdminPosition {
    id: string;
    name: string;
    page: number;
    size: number;
}