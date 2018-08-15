import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { AdminService } from 'category/admin/admin.service';
import { CountryService } from 'category/country/country.service';
import { RegionService } from 'category/region/region.service';
// Model
import {CountryModel,ICountryModel } from 'share-models/country.model';
import {AdminCRUDModel,IAdminCRUDModel } from 'share-models/admin.model';
import {RegionCRUDModel,IRegionCRUDModel } from 'share-models/region.model';
import {AdminLocationCRUDModel } from 'share-models/admin-location.model';

export class AdminLocaltionModalContext extends BSModalContext {
    dialogClass: string;
    dataAdminLoca: AdminLocationCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'admin-location-modal',
    styles: [],
    templateUrl: "./../pages/admin-location-crud-modal.component.html"
})
export class AdminLocaltionModal implements OnInit, CloseGuard, ModalComponent<AdminLocaltionModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: AdminLocaltionModalContext;
    adminLocation: AdminLocationCRUDModel;
    admins: Array<AdminCRUDModel>;
    countrys: Array<CountryModel>;
    regions: Array<RegionCRUDModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<AdminLocaltionModalContext>,
        public _serviceAdmin: AdminService,
        public _serviceCountry: CountryService,
        public _serviceRegion: RegionService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.adminLocation = this.context.dataAdminLoca;
        this.admins = new Array<AdminCRUDModel>();
        this.countrys = new Array<CountryModel>();
        this.regions = new Array<RegionCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdmin();
        this.getListCountry();
        this.getListRegion();
    }

    // Admin
    getListAdmin(){
        this._serviceAdmin.getList<IAdminCRUDModel>().subscribe(response => this.mappingAdmin(response));
    }

    mappingAdmin(data:ResponseModel<IAdminCRUDModel[]>){
        this.notFoundData = "";
        this.admins.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.admins.push(new AdminCRUDModel(x));
        }
    }

    // Country
    getListCountry(){
        this._serviceCountry.getList<ICountryModel>().subscribe(response => this.mappingCountry(response));
    }

    mappingCountry(data:ResponseModel<ICountryModel[]>){
        this.notFoundData = "";
        this.countrys.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.countrys.push(new CountryModel(x));
        }
    }
    
    // Region
    getListRegion(){
        this._serviceRegion.getList<IRegionCRUDModel>().subscribe(response => this.mappingRegion(response));
    }

    mappingRegion(data:ResponseModel<IRegionCRUDModel[]>){
        this.notFoundData = "";
        this.regions.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.regions.push(new RegionCRUDModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(adminLocationForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!adminLocationForm.valid) {
            return;
        }
        this.dialog.close(this.adminLocation);
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
