import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CountryModel {
    id: string = "";
    name: string = "";
    language: string = "";
    active: number;
    activeName: string;
    constructor (data: ICountryModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.language = data.language || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICountryModel {
    id: string;
    name: string;
    language: string;
    active: number;
}

// Create Update Detail
export class CountryCRUDModel {
    id: string = "";
    name: string = "";
    language: string = "";
    active: number;
    activeName: string;
    constructor (data: ICountryCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
        this.language = data.language || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
    }
}

export interface ICountryCRUDModel {
    id: string;
    name: string;
    language: string;
    active: number;
}

// Api
export class ApiCountryModel {
    id: string;
    name: string;
    language: string;
    active: number;
    createdBy: number;
    updatedBy: number;
    constructor(data: CountryCRUDModel,userID: number, isCreate: boolean){
        this.id = data.id;
        this.name = data.name;
        this.language = data.language;
        this.active = data.active;
        if (isCreate) {
            this.createdBy = userID;
        } else {
            this.updatedBy = userID;
        }
    }
}

export class searchCountry {
    id: string;
    name: string;
    page: number;
    size: number;
}