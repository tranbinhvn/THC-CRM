
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
import {ContractService} from 'category/contract/contract.service';
// Model
import {ContractCRUDModel,IContractCRUDModel} from 'share-models/contract.model';
@Component({
    templateUrl: './../pages/contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    contract: ContractCRUDModel;
    constructor(
        private translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceContract: ContractService,
    ){
        this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        this.contract = new ContractCRUDModel(null);
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let _id = params['id'];
                if (_id) {
                    this.getOneContract(_id);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getOneContract(_id: string){
        this._serviceContract.getOne<IContractCRUDModel>(_id).subscribe(
            response => this.mappingData(response),
            error => this.errorMessage = <any>error,
        );
    }

    mappingData(data: ResponseModel<IContractCRUDModel>){
        this.notFoundData = "";
        if (data == null || data.result == null) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
        this.contract = new ContractCRUDModel(data.result);
    }

    onBack(): void {
        this._router.navigate(['/contract']);
    }

}
