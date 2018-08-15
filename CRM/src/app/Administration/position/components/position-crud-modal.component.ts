import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { PositionCRUDModel } from 'share-models/position.model';

export class PositionModalContext extends BSModalContext {
    dialogClass: string;
    dataPosition: PositionCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'position-modal',
    styles: [],
    templateUrl: "./../pages/position-crud-modal.component.html"
})
export class PositionModal implements CloseGuard, ModalComponent<PositionModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: PositionModalContext;
    position: PositionCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<PositionModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.position = this.context.dataPosition;
    }

    // This function will be called when you close the modal and return the value.
    close(postionForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!postionForm.valid) {
            return;
        }
        this.dialog.close(this.position);
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
