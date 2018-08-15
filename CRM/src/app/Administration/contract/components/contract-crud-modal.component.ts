import { Component,OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { CustomerService } from 'category/customers/customer.service';
import { ContactService } from 'category/contact/contact.service';
import { AdminService } from 'category/admin/admin.service';
// Model
import { ContractCRUDModel } from 'share-models/contract.model';
import { CustomerCRUDModel,ICustomerCRUDModel } from 'share-models/customer.model';
import { ContactCRUDModel,IContactCRUDModel } from 'share-models/contact.model';
import { AdminCRUDModel,IAdminCRUDModel } from 'share-models/admin.model';

export class ContractModalContext extends BSModalContext {
    dialogClass: string;
    dataContract: ContractCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'contract-modal',
    styles: [],
    templateUrl: "./../pages/contract-crud-modal.component.html"
})
export class ContractModal implements OnInit,CloseGuard, ModalComponent<ContractModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: ContractModalContext;
    contract: ContractCRUDModel;
    customers: Array<CustomerCRUDModel>;
    contacts: Array<ContactCRUDModel>;
    admins: Array<AdminCRUDModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listReNew = ContantValues.RENEW_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<ContractModalContext>,
        public _serviceCustomer: CustomerService,
        public _serviceContact: ContactService,
        public _serviceAdmin: AdminService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.contract = this.context.dataContract;
        this.customers = new Array<CustomerCRUDModel>();
        this.contacts = new Array<ContactCRUDModel>();
        this.admins = new Array<AdminCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdmin();
        this.getListCustomer();
        this.getListContact();
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

    // Contact
    getListContact(){
        this._serviceContact.getList<IContactCRUDModel>().subscribe(response => this.mappingStatus(response));
    }

    mappingStatus(data:ResponseModel<IContactCRUDModel[]>){
        this.notFoundData = "";
        this.contacts.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.contacts.push(new ContactCRUDModel(x));
        }
    }

    // Admin
    getListAdmin(){
            this._serviceAdmin.getList<IAdminCRUDModel>().subscribe(response => this.mappingAdmin(response));
    }
    
    mappingAdmin(data:ResponseModel<IAdminCRUDModel[]>){
        this.notFoundData = "";
        this.admins.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
    
        for (let x of data.result) {
            this.admins.push(new AdminCRUDModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(contractForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!contractForm.valid) {
            return;
        }
        this.dialog.close(this.contract);
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
