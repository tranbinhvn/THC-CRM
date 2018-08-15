// List
export class ProductModel {
    id: string = "";
    name: string = "";
    constructor (data: IProductModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface IProductModel {
    id: string;
    name: string;
}

// Create Update Detail
export class ProductCRUDModel {
    id: string = "";
    name: string = "";
    constructor (data: IProductCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.name = data.name || "";
    }
}

export interface IProductCRUDModel {
    id: string;
    name: string;
}

// Api
export class ApiProductModel {
    id: string;
    name: string;
    constructor(data: ProductCRUDModel){
        this.id = data.id;
        this.name = data.name;
    }
}

export class searchProduct {
    id: string;
    name: string;
    page: number;
    size: number;
}