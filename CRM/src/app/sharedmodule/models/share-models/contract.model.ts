import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class ContractModel {
    id: string = "";
    contractNo: string = "";
    value: string = "";
    isRenew: number = 1;
    isRenewName: string;
    saleFirstName: string = "";
    saleLastName: string = "";
    fullNameSale: string;
    contactFirstName: string = "";
    contactLastName: string = "";
    fullNameContact: string;
    customerName: string = "";
    constructor (data: IContractModel) {
        if(!data){return}
        this.id = data.id || "";
        this.contractNo = data.contractNo || "";
        this.value = data.value || "";
        this.isRenew = data.isRenew;
        this.isRenewName = ContantValues.RENEW_LOCK_ITEM.find(s=>{return s.key == this.isRenew}).value || "";
        this.saleFirstName = data.saleFirstName || "";
        this.saleLastName = data.saleLastName || "";
        this.fullNameSale = this.saleLastName + " " + this.saleFirstName || "";
        this.contactFirstName = data.contactFirstName || "";
        this.contactLastName = data.contactLastName || "";
        this.fullNameContact = this.contactLastName + " " + this.contactFirstName || "";
        this.customerName = data.customerName || "";
    }
}

export interface IContractModel {
    id: string;
    contractNo: string;
    value: string;
    isRenew: number;
    saleId: string;
    saleFirstName: string;
    saleLastName: string;
    contactId: string;
    contactFirstName: string;
    contactLastName: string;
    customerId: string;
    customerName: string;
}

// Create Update Detail
export class ContractCRUDModel {
    id: string = "";
    contractNo: string = "";
    value: string = "";
    isRenew: number = 1;
    isRenewName: string;
    saleId: string = "";
    saleFirstName: string = "";
    saleLastName: string = "";
    fullNameSale: string;
    contactId: string = "";
    contactFirstName: string = "";
    contactLastName: string = "";
    fullNameContact: string;
    customerId: string = "";
    customerName: string = "";
    constructor (data: IContractCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.contractNo = data.contractNo || "";
        this.value = data.value || "";
        this.isRenew = data.isRenew || 0;
        this.isRenewName = ContantValues.RENEW_LOCK_ITEM.find(s=>{return s.key == this.isRenew}).value || "";
        this.saleId = data.saleId || "";
        this.saleFirstName = data.saleFirstName || "";
        this.saleLastName = data.saleLastName || "";
        this.fullNameSale = this.saleFirstName + " " + this.saleLastName || "";
        this.contactId = data.contactId || "";
        this.contactFirstName = data.contactFirstName || "";
        this.contactLastName = data.contactLastName || "";
        this.fullNameContact = this.contactFirstName + " " + this.contactLastName || "";
        this.customerId = data.customerId || "";
        this.customerName = data.customerName || "";
    }
}

export interface IContractCRUDModel {
    id: string;
    contractNo: string;
    value: string;
    isRenew: number;
    saleId: string;
    saleFirstName: string;
    saleLastName: string;
    contactId: string;
    contactFirstName: string;
    contactLastName: string;
    customerId: string;
    customerName: string;
}

// Api
export class ApiContractModel {
    id: string;
    contractNo: string;
    value: string;
    isRenew: number;
    saleId: string;
    contactId: string;
    customerId: string;
    constructor(data: ContractCRUDModel,userID: number){
        this.id = data.id;
        this.contractNo = data.contractNo;
        this.value = data.value;
        this.isRenew = data.isRenew;
        this.saleId = data.saleId;
        this.contactId = data.contactId;
        this.customerId = data.customerId;
    }
}

export class searchContract {
    id: string;
    name: string;
    page: number;
    size: number;
}