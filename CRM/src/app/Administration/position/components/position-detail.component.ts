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
import { PositionService } from 'category/position/position.service';
// Model
import {PositionCRUDModel,IPositionCRUDModel} from 'share-models/position.model';
@Component({
    templateUrl: './../pages/position-detail.component.html',
})
export class PositionDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    position: PositionCRUDModel;
    constructor(
        // private translate: TranslateService,
        // public _route: ActivatedRoute, 
        // public _router: Router,
        // public _servicePosition: PositionService,
    ){
        // this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        // this.position = new PositionCRUDModel(null);
    }

    ngOnInit(): void {
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let _id = params['id'];
        //         if (_id) {
        //             this.getOnePosition(_id);
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // getOnePosition(_id: string){
    //     this._servicePosition.getOne<IPositionCRUDModel>(_id).subscribe(
    //         response => this.mappingData(response),
    //         error => this.errorMessage = <any>error,
    //     );
    // }

    // mappingData(data: ResponseModel<IPositionCRUDModel>){
    //     this.notFoundData = "";
    //     if (data == null || data.result == null) {
    //         this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
    //         return;
    //     }
    //     this.position = new PositionCRUDModel(data.result);
    // }

    // onBack(): void {
    //     this._router.navigate(['/position']);
    // }

}
