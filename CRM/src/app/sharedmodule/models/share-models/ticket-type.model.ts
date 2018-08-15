import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class TickettypeModel {
    id: string = "";
    name: string = "";
    constructor (data: ITickettypeModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface ITickettypeModel {
    id: string;
    name: string;
}

// Create Update Detail
export class TickettypeCRUDModel {
    id: string = "";
    name: string = "";
    constructor (data: ITickettypeCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface ITickettypeCRUDModel {
    id: string;
    name: string;
}

// Api
export class ApiTickettypeModel {
    id: string;
    name: string;
    constructor(data: TickettypeCRUDModel){
        this.id = data.id;
        this.name = data.name;
    }
}

export class searchTickettype {
    id: string;
    name: string;
    page: number;
    size: number;
}