import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { AdminService } from 'category/admin/admin.service';
import { PositionService } from 'category/position/position.service';
// Model
import {PositionModel,IPositionModel } from 'share-models/position.model';
import {AdminModel,IAdminModel } from 'share-models/admin.model';
import {AdminPositionCRUDModel} from 'share-models/admin-position.model';

export class AdminPositionModalContext extends BSModalContext {
    dialogClass: string;
    dataAdminPos: AdminPositionCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'admin-position-modal',
    styles: [],
    templateUrl: "./../pages/admin-position-crud-modal.component.html"
})
export class AdminPositionModal implements OnInit, CloseGuard, ModalComponent<AdminPositionModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: AdminPositionModalContext;
    adminPosition: AdminPositionCRUDModel;
    admins: Array<AdminModel>;
    positions: Array<PositionModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<AdminPositionModalContext>,
        public _serviceAdmin: AdminService,
        public _servicePosition: PositionService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.adminPosition = this.context.dataAdminPos;
        this.admins = new Array<AdminModel>();
        this.positions = new Array<PositionModel>();
    }

    ngOnInit(): void {
        this.getListAdmin();
        this.getListPosition();
    }

    // Admin
    getListAdmin(){
        this._serviceAdmin.getList<AdminModel>().subscribe(response => this.mappingAdmin(response));
    }

    mappingAdmin(data:ResponseModel<IAdminModel[]>){
        this.notFoundData = "";
        this.admins.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.admins.push(new AdminModel(x));
        }
    }

    // Position
    getListPosition(){
        this._servicePosition.getList<IPositionModel>().subscribe(response => this.mappingPosition(response));
    }

    mappingPosition(data:ResponseModel<IPositionModel[]>){
        this.notFoundData = "";
        this.positions.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.positions.push(new PositionModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(adminPositionForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!adminPositionForm.valid) {
            return;
        }
        this.dialog.close(this.adminPosition);
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
