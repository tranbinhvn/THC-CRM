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
import { RegionService } from 'category/region/region.service';
// Model
import {IRegionCRUDModel,RegionCRUDModel} from 'share-models/region.model';
@Component({
    templateUrl: './../pages/region-detail.component.html',
})
export class RegionDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    region: RegionCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceRegion: RegionService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.region = new RegionCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneRegion(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // getOneRegion(_id: string){
    //     this._serviceRegion.getOne<IRegionCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IRegionCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.region = new RegionCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/region']);
    // }

}
