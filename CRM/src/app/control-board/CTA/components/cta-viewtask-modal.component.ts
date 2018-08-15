import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Model
import { CTACRUDModel } from 'share-models/cta.model';

export class CTAViewtaskModalContext extends BSModalContext {
  dialogClass: string;
  dataViewTask: CTACRUDModel;
  dataMessage: string;
}
@Component({
  selector: 'list-view',
  templateUrl: './../pages/cta-viewtask-modal.component.html'
})
export class CTAViewtaskModal implements OnInit, CloseGuard, ModalComponent<CTAViewtaskModalContext> {
  pageStatus: string = "init";
  notFoundData: string = null;
  submitted: boolean = false;
  context: CTAViewtaskModalContext;
  ctaView: CTACRUDModel;
  defaultCssClass: string = "modal-dialog thc-modal-dialog";
  expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
  constructor(
      public dialog: DialogRef<CTAViewtaskModalContext>,
  ) {
      this.context = dialog.context;
      this.context.dialogClass = this.defaultCssClass;
      this.ctaView = this.context.dataViewTask;
  }

  ngOnInit(): void {
  }

  // This function will be called when you close the modal and return the value.
  close(ctaViewtaskForm: any) {
      this.pageStatus = "submit";
      this.submitted = true;
      if (!ctaViewtaskForm.valid) {
          return;
      }
      this.dialog.close(this.ctaView);
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

