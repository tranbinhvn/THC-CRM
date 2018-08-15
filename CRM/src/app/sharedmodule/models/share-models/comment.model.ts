import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CommentModel {
    id: string = "";
    content: string = "";
    active: number = 1;
    activeName: string;
    customerName: string = "";
    constructor (data: ICommentModel) {
        if(!data){return}
        this.id = data.id || "";
        this.content = data.content || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "";
        this.customerName = data.customerName || "";
    }
}

export interface ICommentModel {
    id: string;
    content: string;
    active: number;
    customerId: string;
    customerName: string;
}

// Create Update Detail
export class CommentCRUDModel {
    id: string = "";
    content: string = "";
    active: number = 1;
    activeName: string = "";
    customerId: string = "";
    customerName: string = "";
    constructor (data: ICommentCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.content = data.content || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "";
        this.customerId = data.customerId || "";
        this.customerName = data.customerName || "";
    }
}

export interface ICommentCRUDModel {
    id: string;
    content: string;
    active: number;
    customerId: string;
    customerName: string;
    createdBy: number;
}

// Api
export class ApiCommentModel {
    id: string;
    content: string;
    active: number;
    customerId: string;
    customerName: string;
    createdBy: number;
    constructor(data: CommentCRUDModel,createdBy: number){
        this.id = data.id;
        this.content = data.content;
        this.active = data.active;
        this.customerId = data.customerId;
        this.customerName = data.customerName;
        this.createdBy = createdBy
    }
}

export class searchComment {
    id: string;
    name: string;
    page: number;
    size: number;
}