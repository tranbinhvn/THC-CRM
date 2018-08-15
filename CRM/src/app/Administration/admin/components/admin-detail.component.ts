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
import { AdminService } from 'app/sharedmodule/category/admin/admin.service';
// Model
import {AdminCRUDModel,IAdminCRUDModel} from 'share-models/admin.model';
@Component({
    templateUrl: './../pages/admin-detail.component.html',
})
export class AdminDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    admin: AdminCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceAdmin: AdminService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.admin = new AdminCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneAdmin(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }

    // getOneAdmin(_id: string){
    //     this._serviceAdmin.getOne<IAdminCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IAdminCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.admin = new AdminCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/administration']);
    // }

}
