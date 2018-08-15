import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { CustomerService } from 'category/customers/customer.service';
// Model
import { CommentCRUDModel } from 'share-models/comment.model';
import { CustomerCRUDModel,ICustomerCRUDModel } from 'share-models/customer.model';

export class CommentModalContext extends BSModalContext {
    dialogClass: string;
    dataComment: CommentCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'comment-modal',
    styles: [],
    templateUrl: "./../pages/comment-create-update-modal.component.html"
})
export class CommentModal implements OnInit, CloseGuard, ModalComponent<CommentModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CommentModalContext;
    comment: CommentCRUDModel;
    customers: Array<CustomerCRUDModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listActive = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CommentModalContext>,
        public _serviceCustomer: CustomerService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.comment = this.context.dataComment;
        this.customers = new Array<CustomerCRUDModel>();
    }

    ngOnInit(): void {
        this.getListCustomer();
    }

    // Customer
    getListCustomer(){
        this._serviceCustomer.getList<ICustomerCRUDModel>().subscribe(response => this.mappingAdmin(response));
    }

    mappingAdmin(data:ResponseModel<ICustomerCRUDModel[]>){
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

    // This function will be called when you close the modal and return the value.
    close(commentForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!commentForm.valid) {
            return;
        }
        this.dialog.close(this.comment);
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
