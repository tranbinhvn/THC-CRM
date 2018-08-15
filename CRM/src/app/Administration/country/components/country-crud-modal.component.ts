import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { CountryCRUDModel } from 'share-models/country.model';

export class CountryModalContext extends BSModalContext {
    dialogClass: string;
    dataCountry: CountryCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'country-modal',
    styles: [],
    templateUrl: "./../pages/country-crud-modal.component.html"
})
export class CountryModal implements CloseGuard, ModalComponent<CountryModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CountryModalContext;
    country: CountryCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CountryModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.country = this.context.dataCountry;
    }

    // This function will be called when you close the modal and return the value.
    close(countryForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!countryForm.valid) {
            return;
        }
        this.dialog.close(this.country);
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
