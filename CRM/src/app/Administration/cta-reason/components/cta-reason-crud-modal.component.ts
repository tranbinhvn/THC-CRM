import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { CTAReasonCRUDModel } from 'share-models/cta-reason.model';

export class CTAReasonModalContext extends BSModalContext {
    dialogClass: string;
    dataCtaRea: CTAReasonCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-reason-modal',
    styles: [],
    templateUrl: "./../pages/cta-reason-crud-modal.component.html"
})
export class CTAReasonModal implements CloseGuard, ModalComponent<CTAReasonModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CTAReasonModalContext;
    ctaReason: CTAReasonCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CTAReasonModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ctaReason = this.context.dataCtaRea;
    }

    // This function will be called when you close the modal and return the value.
    close(ctaReasonForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaReasonForm.valid) {
            return;
        }
        this.dialog.close(this.ctaReason);
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
