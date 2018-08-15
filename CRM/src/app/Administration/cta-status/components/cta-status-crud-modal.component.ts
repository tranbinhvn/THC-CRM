import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { CTAStatusCRUDModel } from 'share-models/cta-status.model';

export class CTAStatusModalContext extends BSModalContext {
    dialogClass: string;
    dataCtaSta: CTAStatusCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-status-modal',
    styles: [],
    templateUrl: "./../pages/cta-status-crud-modal.component.html"
})
export class CTAStatusModal implements CloseGuard, ModalComponent<CTAStatusModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CTAStatusModalContext;
    ctaStatus: CTAStatusCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CTAStatusModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ctaStatus = this.context.dataCtaSta;
    }

    // This function will be called when you close the modal and return the value.
    close(ctaStatusForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaStatusForm.valid) {
            return;
        }
        this.dialog.close(this.ctaStatus);
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
