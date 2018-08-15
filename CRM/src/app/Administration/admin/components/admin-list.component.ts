import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { AdminModal } from './admin-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
// Service
import { AdminService } from 'app/sharedmodule/category/admin/admin.service';
// Model
import { ApiAdminModel,AdminModel,IAdminModel,AdminCRUDModel } from 'share-models/admin.model';
@Component({
    templateUrl: './../pages/admin-list.component.html',
})
export class AdminListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    admins: Array<AdminModel>;
    searchName: string;
    translate: string;
    titleAd = ContantValues.TITLE_ADMIN;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdmin: AdminService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.admins = new Array<AdminModel>();
    }

    ngOnInit(): void {
        this.getListAdmin(this.pageSelect);
    }

    getListAdmin(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceAdmin.searchPaging<IAdminModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceAdmin.getListPaging<IAdminModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IAdminModel[]>): void {
        this.notFoundData = ""; 
        this.admins.length = 0;
        this.totalRecords.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        this.pagesTotal = data.totalPage;
        for (var index = 1; index <= this.pagesTotal; index++) {
            this.totalRecords.push(index);
        }

        for (let x of data.result) {
            this.admins.push(new AdminModel(x));
        }
    }

    createAdmin(){
        let admin = new AdminCRUDModel(null);
        const dialog = this.modal.open(AdminModal, overlayConfigFactory({dataAdmin: admin, dataMessage: this.titleAd.find(s =>{return s.key == 1}).value || "" }, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminCRUDModel) => {
                if (!result) return;
            this._serviceAdmin.create<ApiAdminModel>(new ApiAdminModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateAdmin(i: string){
        const dialog = this.modal.open(AdminModal, overlayConfigFactory({dataAdmin: this.admins[i], dataMessage: this.titleAd.find(s =>{return s.key == 2}).value || "" }, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminCRUDModel) => {
                if (!result) return;
            this._serviceAdmin.update<ApiAdminModel>(new ApiAdminModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    delete(id: string): void {
        this._serviceAdmin.delete<ApiAdminModel>(id).subscribe(response => this.reloadData(response));
    }

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListAdmin(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }
}







