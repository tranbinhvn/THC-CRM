import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { MarketLevelCRUDModel } from 'share-models/market-level.model';

export class MarketLevelModalContext extends BSModalContext {
    dialogClass: string;
    dataMarketLevel: MarketLevelCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'market-level-modal',
    styles: [],
    templateUrl: "./../pages/market-level-crud-modal.component.html"
})
export class MarketLevelModal implements CloseGuard, ModalComponent<MarketLevelModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: MarketLevelModalContext;
    marketLevel: MarketLevelCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<MarketLevelModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.marketLevel = this.context.dataMarketLevel;
    }

    // This function will be called when you close the modal and return the value.
    close(marketLevelForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!marketLevelForm.valid) {
            return;
        }
        this.dialog.close(this.marketLevel);
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
