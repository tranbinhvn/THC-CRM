import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class StatusModel {
    id: string = "";
    name: string = "";
    constructor (data: IStatusModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface IStatusModel {
    id: string;
    name: string;
}

// Create Update Detail
export class StatusCRUDModel {
    id: string = "";
    name: string = "";
    constructor (data: IStatusCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface IStatusCRUDModel {
    id: string;
    name: string;
}

// Api
export class ApiStatusModel {
    id: string;
    name: string;
    constructor(data: StatusCRUDModel){
        this.id = data.id;
        this.name = data.name;
    }
}

export class searchStatus {
    id: string;
    name: string;
    page: number;
    size: number;
}