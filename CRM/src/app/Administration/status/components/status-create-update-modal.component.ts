import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { StatusCRUDModel } from 'share-models/status.model';

export class StatusModalContext extends BSModalContext {
    dialogClass: string;
    dataStatus: StatusCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'status-modal',
    styles: [],
    templateUrl: "./../pages/status-create-update-modal.component.html"
})
export class StatusModal implements CloseGuard, ModalComponent<StatusModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: StatusModalContext;
    status: StatusCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<StatusModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.status = this.context.dataStatus;
    }

    // This function will be called when you close the modal and return the value.
    close(statusForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!statusForm.valid) {
            return;
        }
        this.dialog.close(this.status);
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
