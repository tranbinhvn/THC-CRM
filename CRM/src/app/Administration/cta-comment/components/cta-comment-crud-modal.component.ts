import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { CTAService } from 'category/cta/cta.service';
// Model
import { CTACommentCRUDModel } from 'share-models/cta-comment.model';
import { CTAModel,ICTAModel } from 'share-models/cta.model';

export class CTACommentModalContext extends BSModalContext {
    dialogClass: string;
    dataCtaCom: CTACommentCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-comment-modal',
    styles: [],
    templateUrl: "./../pages/cta-comment-crud-modal.component.html"
})
export class CTACommentModal implements OnInit, CloseGuard, ModalComponent<CTACommentModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: CTACommentModalContext;
    ctaComment: CTACommentCRUDModel;
    ctas: Array<CTAModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    listStatus = ContantValues.ACTIVE_LOCK_ITEM;
    constructor(
        public dialog: DialogRef<CTACommentModalContext>,
        public _serviceCTA: CTAService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.ctaComment = this.context.dataCtaCom;
        this.ctas = new Array<CTAModel>();
    }

    ngOnInit(): void {
        this.getListCTA();
    }

    // CTA
    getListCTA(){
        this._serviceCTA.getList<ICTAModel>().subscribe(response => this.mappingCTA(response));
    }

    mappingCTA(data:ResponseModel<ICTAModel[]>){
        this.notFoundData = "";
        this.ctas.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctas.push(new  CTAModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(ctaCommentForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaCommentForm.valid) {
            return;
        }
        this.dialog.close(this.ctaComment);
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
