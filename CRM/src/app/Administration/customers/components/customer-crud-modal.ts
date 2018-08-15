import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { CustomerService } from 'category/customers/customer.service';
import { StatusService } from 'category/status/status.service';
// Model
import { CustomerCRUDModel,ICustomerCRUDModel} from 'share-models/customer.model';
import { StatusCRUDModel,IStatusCRUDModel } from 'share-models/status.model';
export class CustomerModalContext extends BSModalContext {
    dialogClass: string;
    dataCustomer: CustomerCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'customer-modal',
    styles: [],
    templateUrl: "./../pages/customer-crud-modal.html",
})
export class CustomerModal implements OnInit, CloseGuard, ModalComponent<CustomerModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CustomerModalContext;
    customer: CustomerCRUDModel; 
    customers: Array<CustomerCRUDModel>;
    status: Array<StatusCRUDModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.STATUS_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CustomerModalContext>,
        public _serviceCustomer: CustomerService,
        public _serviceStatus: StatusService,
    ){
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.customer = this.context.dataCustomer;
        this.customers = new Array<CustomerCRUDModel>();
        this.status = new Array<StatusCRUDModel>();
    }

    ngOnInit(): void {
        this.getListCustomer();
        this.getListStatus();
    }

     // Customer
    getListCustomer(){
        this._serviceCustomer.getList<ICustomerCRUDModel>().subscribe(response => this.mappingCustomers(response));
    }

    mappingCustomers(data:ResponseModel<ICustomerCRUDModel[]>){
        this.notFoundData = "";
        this.customers.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.customers.push(new CustomerCRUDModel(x));
        }
    }

    // Status
    getListStatus(){
        this._serviceStatus.getList<IStatusCRUDModel>().subscribe(response => this.mappingStatus(response));
    }

    mappingStatus(data:ResponseModel<IStatusCRUDModel[]>){
        this.notFoundData = "";
        this.status.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.status.push(new StatusCRUDModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(customerForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!customerForm.valid) {
            return;
        }
        this.dialog.close(this.customer);
    }

    // This function will be called when you click outside of modal or click the x button.
    dismiss() {
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return false;
    }

    
    isExpanded: boolean = false;
    expand(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded == true)
            this.context.dialogClass = this.expandCssClass;
        else
            this.context.dialogClass = this.defaultCssClass;
    }
}
