import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { AdminLocaltionModal } from './admin-location-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { AdminLocationService } from 'category/admin/admin-location.service';
// Model
import { ApiAdminLocationModel,AdminLocationCRUDModel,IAdminLocationCRUDModel } from 'share-models/admin-location.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/admin-location-list.component.html',
})
export class AdminLocationListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    adminLocations: Array<AdminLocationCRUDModel>;
    searchName: string;
    titleAdLoca = ContantValues.TITLE_ADMIN_LOCATION;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdminLocation: AdminLocationService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.adminLocations = new Array<AdminLocationCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdminLocation(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListAdminLocation(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceAdminLocation.searchPaging<IAdminLocationCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceAdminLocation.getListPaging<IAdminLocationCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IAdminLocationCRUDModel[]>): void {
        this.notFoundData = "";
        this.adminLocations.length = 0;
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
            this.adminLocations.push(new AdminLocationCRUDModel(x));
        }
    }

    createAdminLocation(){
        let adminLocation = new AdminLocationCRUDModel(null);
        const dialog = this.modal.open(AdminLocaltionModal, overlayConfigFactory({dataAdminLoca: adminLocation, dataMessage: this.titleAdLoca.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminLocationCRUDModel) => {
                if (!result) return;
            this._serviceAdminLocation.create<ApiAdminLocationModel>(new ApiAdminLocationModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateAdminLocation(i: string){
        const dialog = this.modal.open(AdminLocaltionModal, overlayConfigFactory({dataAdminLoca: this.adminLocations[i], dataMessage: this.titleAdLoca.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminLocationCRUDModel) => {
                if (!result) return;
            this._serviceAdminLocation.update<ApiAdminLocationModel>(new ApiAdminLocationModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
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
        this._serviceAdminLocation.delete<ApiAdminLocationModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListAdminLocation(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
