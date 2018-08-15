import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { CTATypeCRUDModel } from 'share-models/cta-type.model';

export class CTATypeModalContext extends BSModalContext {
    dialogClass: string;
    dataCtaType: CTATypeCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-typr-modal',
    styles: [],
    templateUrl: "./../pages/cta-type-crud-modal.component.html"
})
export class CTATypeModal implements CloseGuard, ModalComponent<CTATypeModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CTATypeModalContext;
    ctaType: CTATypeCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CTATypeModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ctaType = this.context.dataCtaType;
    }

    // This function will be called when you close the modal and return the value.
    close(ctaTypeForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaTypeForm.valid) {
            return;
        }
        this.dialog.close(this.ctaType);
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
