import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { RoleModal } from './role-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { RoleService } from 'category/role/role.service';
// Model
import {ApiRoleModel,RoleModel,IRoleModel,RoleCRUDModel} from 'share-models/role.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/role-list.component.html',
})
export class RoleListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    roles: Array<RoleModel>;
    searchName: string;
    titleRole = ContantValues.TITLE_ROLE;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceRole: RoleService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.roles = new Array<RoleModel>();
    }

    ngOnInit(): void {
        this.getListRole(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListRole(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceRole.searchPaging<IRoleModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceRole.getListPaging<IRoleModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IRoleModel[]>): void {
        this.notFoundData = "";
        this.roles.length = 0;
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
            this.roles.push(new RoleModel(x));
        }
    }

    createRole(){
        let role = new RoleCRUDModel(null);
        const dialog = this.modal.open(RoleModal, overlayConfigFactory({dataRole: role, dataMessage: this.titleRole.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: RoleCRUDModel) => {
                if (!result) return;
            this._serviceRole.create<ApiRoleModel>(new ApiRoleModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateRole(i: string){
        const dialog = this.modal.open(RoleModal, overlayConfigFactory({dataRole: this.roles[i], dataMessage: this.titleRole.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: RoleCRUDModel) => {
                if (!result) return;
            this._serviceRole.update<ApiRoleModel>(new ApiRoleModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
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
        this._serviceRole.delete<ApiRoleModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListRole(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
