import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { ProductCRUDModel } from 'share-models/product.model';

export class ProductModalContext extends BSModalContext {
    dialogClass: string;
    dataProduct: ProductCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'product-modal',
    styles: [],
    templateUrl: "./../pages/product-crud-modal.component.html"
})
export class ProductModal implements CloseGuard, ModalComponent<ProductModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: ProductModalContext;
    product: ProductCRUDModel;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<ProductModalContext>,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.product = this.context.dataProduct;
    }

    // This function will be called when you close the modal and return the value.
    close(productForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!productForm.valid) {
            return;
        }
        this.dialog.close(this.product);
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
