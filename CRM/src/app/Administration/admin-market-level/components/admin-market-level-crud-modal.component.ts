import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { AdminService } from 'category/admin/admin.service';
import { MarketLevelService } from 'category/market-level/marketlevel.service';
// Model
import {AdminMarketLevelCRUDModel } from 'share-models/admin-market-level.model';
import {AdminModel,IAdminModel } from 'share-models/admin.model';
import {MarketLevelModel,IMarketLevelModel} from 'share-models/market-level.model';

export class AdminMarketLevelModalContext extends BSModalContext {
    dialogClass: string;
    dataAdminMarLev: AdminMarketLevelCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'admin-market-level-modal',
    styles: [],
    templateUrl: "./../pages/admin-market-level-crud-modal.component.html"
})
export class AdminMarketLevelModal implements OnInit, CloseGuard, ModalComponent<AdminMarketLevelModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: AdminMarketLevelModalContext;
    adminMarketLevel: AdminMarketLevelCRUDModel;
    admins: Array<AdminModel>;
    marketLevels: Array<MarketLevelModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<AdminMarketLevelModalContext>,
        public _serviceAdmin: AdminService,
        public _serviceMarketLevel: MarketLevelService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.adminMarketLevel = this.context.dataAdminMarLev;
        this.admins = new Array<AdminModel>();
        this.marketLevels = new Array<MarketLevelModel>();
    }

    ngOnInit(): void {
        this.getListAdmin();
        this.getListMarketLevel();
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

    // Market Level
    getListMarketLevel(){
        this._serviceMarketLevel.getList<IMarketLevelModel>().subscribe(response => this.mappingMarketLevel(response));
    }

    mappingMarketLevel(data:ResponseModel<IMarketLevelModel[]>){
        this.notFoundData = "";
        this.marketLevels.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.marketLevels.push(new MarketLevelModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(adminMarketLevelForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!adminMarketLevelForm.valid) {
            return;
        }
        this.dialog.close(this.adminMarketLevel);
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
