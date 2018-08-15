import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
//Service
import { CustomerService } from 'category/customers/customer.service';
import { ContactService } from 'category/contact/contact.service';
import { ProductService } from 'category/product/product.service';
import { TickettypeService } from 'category/ticket/tickettype.service';
// Model
import { TicketCRUDModel } from 'share-models/ticket.model';
import { CustomerCRUDModel,ICustomerCRUDModel } from 'share-models/customer.model';
import { ContactCRUDModel,IContactCRUDModel } from 'share-models/contact.model';
import { ITickettypeCRUDModel,TickettypeCRUDModel } from 'share-models/ticket-type.model';
import { IProductCRUDModel,ProductCRUDModel } from 'share-models/product.model';

export class TicketModalContext extends BSModalContext {
    dialogClass: string;
    dataTicket: TicketCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'ticket-modal',
    styles: [],
    templateUrl: "./../pages/ticket-create-update-modal.component.html"
})
export class TicketModal implements CloseGuard, ModalComponent<TicketModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: TicketModalContext;
    ticket: TicketCRUDModel;
    customers: Array<CustomerCRUDModel>;
    contacts: Array<ContactCRUDModel>;
    tickettypes: Array<TickettypeCRUDModel>;
    products: Array<ProductCRUDModel>;
    listActive = ContantValues.ACTIVE_LOCK_ITEM;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<TicketModalContext>,
        public _serviceCustomer: CustomerService,
        public _serviceContact: ContactService,
        public _serviceTicketType: TickettypeService,
        public _serviceProduct: ProductService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ticket = this.context.dataTicket;
        this.customers = new Array<CustomerCRUDModel>();
        this.contacts = new Array<ContactCRUDModel>();
        this.tickettypes = new Array<TickettypeCRUDModel>();
        this.products = new Array<ProductCRUDModel>();
    }

    ngOnInit(): void {
            this.getListCustomer();
            this.getListContact();
            this.getListTicketType();
            this.getListProduct();
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

    // Ticket Type
    getListTicketType(){
        this._serviceTicketType.getList<ITickettypeCRUDModel>().subscribe(response => this.mappingTicketType(response));
    }

    mappingTicketType(data:ResponseModel<ITickettypeCRUDModel[]>){
        this.notFoundData = "";
        this.tickettypes.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.tickettypes.push(new TickettypeCRUDModel(x));
        }
    }

    // Product
    getListProduct(){
        this._serviceProduct.getList<IProductCRUDModel>().subscribe(response => this.mappingProduct(response));
    }

    mappingProduct(data:ResponseModel<IProductCRUDModel[]>){
        this.notFoundData = "";
        this.products.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.products.push(new ProductCRUDModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(ticketForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ticketForm.valid) {
            return;
        }
        this.dialog.close(this.ticket);
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
