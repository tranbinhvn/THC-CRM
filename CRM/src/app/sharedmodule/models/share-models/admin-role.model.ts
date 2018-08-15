import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class AdminRoleModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    adminFirstName: string = "";
    adminLastName: string = "";
    fullNameAdRole: string = "";
    roleName: string = "";
    constructor (data: IAdminRoleModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdRole = this.adminLastName + " " + this.adminFirstName;
        this.roleName = data.roleName || "";
    }
}

export interface IAdminRoleModel {
    id: string;
    startDate: string;
    endDate: string;
    adminFirstName: string;
    adminLastName: string;
    roleName: string;
}

// Create Update Detail
export class AdminRoleCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    fullNameAdRole: string = "";
    roleId: string;
    roleName: string;
    constructor (data: IAdminRoleCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.startDate = data.startDate || "";
        this.endDate = data.endDate || "";
        this.adminId = data.adminId || "";
        this.adminFirstName = data.adminFirstName || "";
        this.adminLastName = data.adminLastName || "";
        this.fullNameAdRole = this.adminLastName + " " + this.adminFirstName;
        this.roleId = data.roleId || "";
        this.roleName = data.roleName || "";
    }
}

export interface IAdminRoleCRUDModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    roleId: string;
    roleName: string;
    createdBy: number;
    updateBy: number;
}

// Api
export class ApiAdminRoleModel {
    id: string;
    startDate: string;
    endDate: string;
    adminId: string;
    adminFirstName: string;
    adminLastName: string;
    roleId: string;
    roleName: string;
    createdBy: number;
    updatedBy: number;
    constructor (data: AdminRoleCRUDModel,userID: number, isCreate: boolean) {
        if(!data){return}
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.adminId = data.adminId;
        this.adminFirstName = data.adminFirstName;
        this.adminLastName = data.adminLastName;
        this.roleId = data.roleId;
        this.roleName = data.roleName;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchAdminRole {
    id: string;
    name: string;
    page: number;
    size: number;
}