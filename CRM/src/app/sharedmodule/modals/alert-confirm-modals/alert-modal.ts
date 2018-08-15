import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TranslateService } from 'ng2-translate';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';

export class AlertModalContext extends BSModalContext {
    public title: string = "";
    public messge: string = "";
}

@Component({
    selector: 'thc-alert',
    template: `
    <div class="">
        <div class="modal-content">
            <div class="modal-header modal_header_color">
                <button type="button" class="close" (click)="close()">&times;</button>
                <h4 class="modal-title">{{this.context.title}}</h4>
            </div>
            <div class="modal-body">
                <div class="row margin_both">
                    <div class="col-md-12">
                        <div class="row form-group text-center">
                        <span>{{this.context.messge}}</span>
                        </div>
                        <div class="row form-group">
                            <div class="text-center">
                                <button type="button" class="btn btn-save" (click)="close()">{{'Common.Ok'| translate}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: []
})
export class AlertModal implements CloseGuard, ModalComponent<AlertModalContext> {
    context: AlertModalContext;
    private _title: string = "";
    private _messge: string = "";
    constructor(public dialog: DialogRef<AlertModalContext>, private translate: TranslateService) {
        this.context = dialog.context;
        this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
    }

    close() {
        this.dialog.close();
    }

    // This function will be called when you click outside of modal or click the x button.
    dismiss() {
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return true;
    }
}