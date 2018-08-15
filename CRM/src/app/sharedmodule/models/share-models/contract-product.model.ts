import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class ContractProductModel {
    id: string = "";
    value: string = "";
    quantity: string = "";
    contractName: string = "";
    productName: string = "";
    constructor (data: IContractProductModel) {
        if(!data){return}
        this.id = data.id || "";
        this.value = data.value || "";
        this.quantity = data.quantity || "";
        this.contractName = data.contractName || "";
        this.productName = data.productName || "";
    }
}

export interface IContractProductModel {
    id: string;
    value: string;
    quantity: string;
    contractId: string;
    contractName: string;
    productId: string;
    productName: string;
}

// Create Update Detail
export class ContractProductCRUDModel {
    id: string = "";
    value: string = "";
    quantity: string = "";
    contractId: string = "";
    contractName: string = "";
    productId: string = "";
    productName: string = "";
    constructor (data: IContractProductCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.value = data.value || "";
        this.quantity = data.quantity || "";
        this.contractId = data.contractId || "";
        this.contractName = data.contractName || "";
        this.productId = data.productId || "";
        this.productName = data.productName || "";
    }
}

export interface IContractProductCRUDModel {
    id: string;
    value: string;
    quantity: string;
    contractId: string;
    contractName: string;
    productId: string;
    productName: string;
}

// Api
export class ApiContractProductModel {
    id: string;
    value: string;
    quantity: string;
    contractId: string;
    productId: string;
    constructor(data: ContractProductCRUDModel){
        this.id = data.id;
        this.value = data.value;
        this.quantity = data.quantity;
        this.contractId = data.contractId;;
        this.productId = data.productId;
    }
}

export class searchContractProduct {
    id: string;
    name: string;
    page: number;
    size: number;
}