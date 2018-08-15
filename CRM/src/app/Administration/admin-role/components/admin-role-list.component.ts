import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { AdminRoleModal } from './admin-role-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { AdminRoleService } from 'category/admin/admin-role.service';
// Model
import {ApiAdminRoleModel,AdminRoleCRUDModel,IAdminRoleCRUDModel} from 'share-models/admin-role.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/admin-role-list.component.html',
})
export class AdminRoleListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    adminRoles: Array<AdminRoleCRUDModel>;
    searchName: string;
    titleAdRole = ContantValues.TITLE_ADMIN_ROLE;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdminRole: AdminRoleService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.adminRoles = new Array<AdminRoleCRUDModel>();
    }

    ngOnInit(): void {
        this.getListAdminRole(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListAdminRole(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceAdminRole.searchPaging<IAdminRoleCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceAdminRole.getListPaging<IAdminRoleCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IAdminRoleCRUDModel[]>): void {
        this.notFoundData = "";
        this.adminRoles.length = 0;
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
            this.adminRoles.push(new AdminRoleCRUDModel(x));
        }
    }

    createAdminRole(){
        let adminRole = new AdminRoleCRUDModel(null);
        const dialog = this.modal.open(AdminRoleModal, overlayConfigFactory({dataAdminRole: adminRole, dataMessage: this.titleAdRole.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminRoleCRUDModel) => {
                if (!result) return;
            this._serviceAdminRole.create<ApiAdminRoleModel>(new ApiAdminRoleModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateAdminRole(i: string){
        const dialog = this.modal.open(AdminRoleModal, overlayConfigFactory({dataAdminRole: this.adminRoles[i], dataMessage: this.titleAdRole.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: AdminRoleCRUDModel) => {
                if (!result) return;
            this._serviceAdminRole.update<ApiAdminRoleModel>(new ApiAdminRoleModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
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
        this._serviceAdminRole.delete<ApiAdminRoleModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListAdminRole(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
