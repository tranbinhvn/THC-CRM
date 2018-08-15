import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { AdminCRUDModel} from 'share-models/admin.model';

export class AdminModalContext extends BSModalContext {
    dialogClass: string;
    dataAdmin: AdminCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'admin-modal',
    styles: [],
    templateUrl: "./../pages/admin-crud-modal.component.html"
})
export class AdminModal implements CloseGuard, ModalComponent<AdminModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    context: AdminModalContext;
    admin: AdminCRUDModel; 
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.STATUS_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<AdminModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.admin = this.context.dataAdmin;
    }

    // This function will be called when you close the modal and return the value.
    close(adminForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!adminForm.valid) {
            return;
        }
        this.dialog.close(this.admin);
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
