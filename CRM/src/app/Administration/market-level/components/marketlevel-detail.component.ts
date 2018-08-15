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
import { MarketLevelService } from 'category/market-level/marketlevel.service';
// Model
import {IMarketLevelCRUDModel,MarketLevelCRUDModel} from 'share-models/market-level.model';
@Component({
    templateUrl: './../pages/marketlevel-detail.component.html',
})
export class MarketLevelDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    marketLevel: MarketLevelCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _serviceMarketLevel: MarketLevelService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.marketLevel = new MarketLevelCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOneMarketLevel(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // getOneMarketLevel(_id: string){
    //     this._serviceMarketLevel.getOne<IMarketLevelCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IMarketLevelCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.marketLevel = new MarketLevelCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/marketlevel']);
    // }

}
