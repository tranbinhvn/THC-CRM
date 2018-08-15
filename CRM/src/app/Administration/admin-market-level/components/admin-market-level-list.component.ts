import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { AdminMarketLevelModal } from './admin-market-level-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { AdminMarketLevelService } from 'category/admin/admin-market-level.service';
// Model
import {ApiAdminMarketLevelModel,AdminMarketLevelCRUDModel,IAdminMarketLevelCRUDModel} from 'share-models/admin-market-level.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/admin-market-level-list.component.html',
})
export class AdminMarketLevelListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    adminMarketLevels: Array<AdminMarketLevelCRUDModel>;
    searchName: string;
    titleAdMarLev = ContantValues.TITLE_ADMIN_MARKET_LEVEL;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdminMarketLevel: AdminMarketLevelService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.adminMarketLevels = new Array<AdminMarketLevelCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdminMarketLevel(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListAdminMarketLevel(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceAdminMarketLevel.searchPaging<IAdminMarketLevelCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceAdminMarketLevel.getListPaging<IAdminMarketLevelCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IAdminMarketLevelCRUDModel[]>): void {
        this.notFoundData = "";
        this.adminMarketLevels.length = 0;
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
            this.adminMarketLevels.push(new AdminMarketLevelCRUDModel(x));
        }
    }

    createAdminMarketLevel(){
        let adminMarketLevel = new AdminMarketLevelCRUDModel(null);
        const dialog = this.modal.open(AdminMarketLevelModal, overlayConfigFactory({dataAdminMarLev: adminMarketLevel, dataMessage: this.titleAdMarLev.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminMarketLevelCRUDModel) => {
                if (!result) return;
            this._serviceAdminMarketLevel.create<ApiAdminMarketLevelModel>(new ApiAdminMarketLevelModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateAdminMarketLevel(i: string){
        const dialog = this.modal.open(AdminMarketLevelModal, overlayConfigFactory({dataAdminMarLev: this.adminMarketLevels[i], dataMessage: this.titleAdMarLev.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminMarketLevelCRUDModel) => {
                if (!result) return;
            this._serviceAdminMarketLevel.update<ApiAdminMarketLevelModel>(new ApiAdminMarketLevelModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }


    delete(id: string): void {
        this._serviceAdminMarketLevel.delete<ApiAdminMarketLevelModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListAdminMarketLevel(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
