import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { AdminPositionModal } from './admin-position-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { AdminPositionService } from 'category/admin/admin-position.service';
// Model
import {ApiAdminPositionModel,AdminPositionCRUDModel,IAdminPositionCRUDModel} from 'share-models/admin-position.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/admin-position-list.component.html',
})
export class AdminPositionListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    adminPositions: Array<AdminPositionCRUDModel>;
    searchName: string;
    titleAdPos = ContantValues.TITLE_ADMIN_POSITION;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdminPosition: AdminPositionService,
    ){
        ////translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.adminPositions = new Array<AdminPositionCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdminPosition(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListAdminPosition(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceAdminPosition.searchPaging<IAdminPositionCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceAdminPosition.getListPaging<IAdminPositionCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IAdminPositionCRUDModel[]>): void {
        this.notFoundData = "";
        this.adminPositions.length = 0;
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
            this.adminPositions.push(new AdminPositionCRUDModel(x));
        }
    }

    createAdminPosition(){
        let adminPosition = new AdminPositionCRUDModel(null);
        const dialog = this.modal.open(AdminPositionModal, overlayConfigFactory({dataAdminPos: adminPosition, dataMessage: this.titleAdPos.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminPositionCRUDModel) => {
                if (!result) return;
            this._serviceAdminPosition.create<ApiAdminPositionModel>(new ApiAdminPositionModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateAdminPosition(i: string){
        const dialog = this.modal.open(AdminPositionModal, overlayConfigFactory({dataAdminPos: this.adminPositions[i], dataMessage: this.titleAdPos.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminPositionCRUDModel) => {
                if (!result) return;
            this._serviceAdminPosition.update<ApiAdminPositionModel>(new ApiAdminPositionModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
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
        this._serviceAdminPosition.delete<ApiAdminPositionModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListAdminPosition(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
