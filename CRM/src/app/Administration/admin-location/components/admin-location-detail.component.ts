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
import { AdminLocationService } from 'category/admin/admin-location.service';
// Model
import {IAdminLocationCRUDModel,AdminLocationCRUDModel} from 'share-models/admin-location.model';
@Component({
    templateUrl: './../pages/admin-location-detail.component.html',
})
export class AdminLocationDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    adminLocation: AdminLocationCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceAdminLocation: AdminLocationService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.adminLocation = new AdminLocationCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneAdminLocation(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }

    // getOneAdminLocation(_id: string){
    //     this._serviceAdminLocation.getOne<IAdminLocationCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IAdminLocationCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.adminLocation = new AdminLocationCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/adminlocation']);
    // }

}
