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
import { RoleService } from 'category/role/role.service';
// Model
import {IRoleCRUDModel,RoleCRUDModel} from 'share-models/role.model';
@Component({
    templateUrl: './../pages/role-detail.component.html',
})
export class RoleDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    role: RoleCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceRole: RoleService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.role = new RoleCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneRole(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // getOneRole(_id: string){
    //     this._serviceRole.getOne<IRoleCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IRoleCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.role = new RoleCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/role']);
    // }

}
