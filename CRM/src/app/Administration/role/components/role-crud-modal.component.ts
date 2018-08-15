import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { RoleCRUDModel } from 'share-models/role.model';

export class RoleModalContext extends BSModalContext {
    dialogClass: string;
    dataRole: RoleCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'role-modal',
    styles: [],
    templateUrl: "./../pages/role-crud-modal.component.html"
})
export class RoleModal implements CloseGuard, ModalComponent<RoleModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: RoleModalContext;
    role: RoleCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<RoleModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.role = this.context.dataRole;
    }

    // This function will be called when you close the modal and return the value.
    close(roleForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!roleForm.valid) {
            return;
        }
        this.dialog.close(this.role);
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
