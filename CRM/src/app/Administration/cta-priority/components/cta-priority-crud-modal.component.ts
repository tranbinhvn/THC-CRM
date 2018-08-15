import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { CTAPriorityCRUDModel } from 'share-models/cta-priority.model';

export class CTAPriorityModalContext extends BSModalContext {
    dialogClass: string;
    dataCtaPri: CTAPriorityCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-priority-modal',
    styles: [],
    templateUrl: "./../pages/cta-priority-crud-modal.component.html"
})
export class CTAPriorityModal implements CloseGuard, ModalComponent<CTAPriorityModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CTAPriorityModalContext;
    ctaPriority: CTAPriorityCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CTAPriorityModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ctaPriority = this.context.dataCtaPri;
    }

    // This function will be called when you close the modal and return the value.
    close(ctaPriorityForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaPriorityForm.valid) {
            return;
        }
        this.dialog.close(this.ctaPriority);
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
