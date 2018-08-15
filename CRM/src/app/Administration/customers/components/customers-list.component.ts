import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CustomerModal } from './customer-crud-modal';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CustomerService } from 'category/customers/customer.service';
// Model
import { ApiCustomerModel,CustomerCRUDModel,ICustomerCRUDModel } from 'share-models/customer.model';
@Component({
    templateUrl: './../pages/customers-list.component.html',
})
export class CustomersListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    customers: Array<CustomerCRUDModel>;
    searchName: string;
    titleCus = ContantValues.TITLE_CUSTOMER;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCustomer: CustomerService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.customers = new Array<CustomerCRUDModel>();
    }

    ngOnInit(): void {
        this.getListCustomer(this.pageSelect);
    }

    getListCustomer(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCustomer.searchPaging<ICustomerCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCustomer.getListPaging<ICustomerCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICustomerCRUDModel[]>): void {
        this.notFoundData = "";
        this.customers.length = 0;
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
            this.customers.push(new CustomerCRUDModel(x));
        }
    }

    createCustomer(){
        let customer = new CustomerCRUDModel(null);
        const dialog = this.modal.open(CustomerModal, overlayConfigFactory({dataCustomer: customer,dataMessage: this.titleCus.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CustomerCRUDModel) => {
                if (!result) return;
            this._serviceCustomer.create<ApiCustomerModel>(new ApiCustomerModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCustomer(i: string){
        const dialog = this.modal.open(CustomerModal, overlayConfigFactory({dataCustomer: this.customers[i],dataMessage: this.titleCus.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CustomerCRUDModel) => {
                if (!result) return;
            this._serviceCustomer.update<ApiCustomerModel>(new ApiCustomerModel(result)).subscribe(response => this.reloadData(response) );
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
        this._serviceCustomer.delete<ApiCustomerModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCustomer(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }
}
