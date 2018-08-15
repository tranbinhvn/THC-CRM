import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class RoleModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IRoleModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IRoleModel {
    id: string;
    name: string;
    active: number;
}

// Create Update Detail
export class RoleCRUDModel {
    id: string = "";
    name: string = "";
    active: number;
    activeName: string;
    constructor (data: IRoleCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface IRoleCRUDModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updateBy: number;
}

// Api
export class ApiRoleModel {
    id: string;
    name: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: RoleCRUDModel,userID: number, isCreate: boolean){
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

export class searchRole {
    id: string;
    name: string;
    page: number;
    size: number;
}