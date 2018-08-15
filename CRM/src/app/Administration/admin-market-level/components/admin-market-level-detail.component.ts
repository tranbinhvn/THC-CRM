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
import { AdminMarketLevelService } from 'category/admin/admin-market-level.service';
// Model
import {AdminMarketLevelCRUDModel,IAdminMarketLevelCRUDModel} from 'share-models/admin-market-level.model';
@Component({
    templateUrl: './../pages/admin-market-level-detail.component.html',
})
export class AdminMarketLevelDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    adminMarketLevel: AdminMarketLevelCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceAdminMarketLevel: AdminMarketLevelService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.adminMarketLevel = new AdminMarketLevelCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneAdminMarketLevel(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // getOneAdminMarketLevel(_id: string){
    //     this._serviceAdminMarketLevel.getOne<IAdminMarketLevelCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IAdminMarketLevelCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.adminMarketLevel = new AdminMarketLevelCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/adminmarketlevel']);
    // }

}
