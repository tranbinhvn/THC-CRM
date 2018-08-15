import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
// Service
import { AdminRoleService } from 'category/admin/admin-role.service';
// Model
import {AdminRoleCRUDModel,IAdminRoleCRUDModel} from 'share-models/admin-role.model';
@Component({
    templateUrl: './../pages/admin-role-detail.component.html',
})
export class AdminRoleDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    adminRole: AdminRoleCRUDModel;
    constructor(
        private translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceAdminRole: AdminRoleService,
    ){
        this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        this.adminRole = new AdminRoleCRUDModel(null);
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let _id = params['id'];
                if (_id) {
                    this.getOneAdminRole(_id);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getOneAdminRole(_id: string){
        this._serviceAdminRole.getOne<IAdminRoleCRUDModel>(_id).subscribe(
            response => this.mappingData(response),
            error => this.errorMessage = <any>error,
        );
    }

    mappingData(data: ResponseModel<IAdminRoleCRUDModel>){
        this.notFoundData = "";
        if (data == null || data.result == null) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
        this.adminRole = new AdminRoleCRUDModel(data.result);
    }

    onBack(): void {
        this._router.navigate(['/adminrole']);
    }

}
