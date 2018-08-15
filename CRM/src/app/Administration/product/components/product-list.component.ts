import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { ProductModal } from './product-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { ProductService } from 'category/product/product.service';
// Model
import {ApiProductModel,IProductModel,ProductModel,ProductCRUDModel} from 'share-models/product.model';
@Component({
    templateUrl: './../pages/product-list.component.html',
})
export class ProductListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    searchName: string;
    products: Array<ProductModel>;
    titlePro = ContantValues.TITLE_PRODUCT;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceProduct: ProductService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.products = new Array<ProductModel>();
    }

    ngOnInit(): void {
        this.getListProduct(this.pageSelect);
    }

    getListProduct(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceProduct.searchPaging<IProductModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceProduct.getListPaging<IProductModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
    } 
    
    mappingData(data: ResponseModel<ProductModel[]>): void {
        this.notFoundData = "";
        this.products.length = 0;
        this.totalRecords.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        this.pagesTotal = data.totalPage;
        for (var index = 1; index <= this.pagesTotal; index++) {
            this.totalRecords.push(index);
        }

        for (let x of data.result) {
            this.products.push(new ProductModel(x));
        }
    }

    createProduct(){
        let product = new ProductCRUDModel(null);
        const dialog = this.modal.open(ProductModal, overlayConfigFactory({dataProduct: product, dataMessage: this.titlePro.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: ProductCRUDModel) => {
                if (!result) return;
            this._serviceProduct.create<ApiProductModel>(new ApiProductModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateProduct(i: string){
        const dialog = this.modal.open(ProductModal, overlayConfigFactory({dataProduct: this.products[i], dataMessage: this.titlePro.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: ProductCRUDModel) => {
                if (!result) return;
            this._serviceProduct.update<ApiProductModel>(new ApiProductModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }


    delete(id: string): void {
        this._serviceProduct.delete<ApiProductModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListProduct(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }


}
