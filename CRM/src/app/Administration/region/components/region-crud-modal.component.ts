import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { RegionCRUDModel } from 'share-models/region.model';

export class RegionModalContext extends BSModalContext {
    dialogClass: string;
    dataRegion: RegionCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'region-modal',
    styles: [],
    templateUrl: "./../pages/region-crud-modal.component.html"
})
export class RegionModal implements CloseGuard, ModalComponent<RegionModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: RegionModalContext;
    region: RegionCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<RegionModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.region = this.context.dataRegion;
    }

    // This function will be called when you close the modal and return the value.
    close(regionForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!regionForm.valid) {
            return;
        }
        this.dialog.close(this.region);
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
