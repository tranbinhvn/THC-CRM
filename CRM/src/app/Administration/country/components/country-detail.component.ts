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
import { CountryService } from 'category/country/country.service';
// Model
import {CountryModel, ICountryModel,searchCountry} from 'share-models/country.model';
@Component({
    templateUrl: './../pages/country-detail.component.html',
})
export class CountryDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    country: CountryModel;
    constructor(
        private translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCountry: CountryService,
    ){
        this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        this.country = new CountryModel(null);
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let _id = params['id'];
                if (_id) {
                    this.getOneCountry(_id);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getOneCountry(_id: string){
        this._serviceCountry.getOne<ICountryModel>(_id).subscribe(
            response => this.mappingData(response),
            error => this.errorMessage = <any>error,
        );
    }

    mappingData(data: ResponseModel<ICountryModel>){
        this.notFoundData = "";
        if (data == null || data.result == null) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
        this.country = new CountryModel(data.result);
    }

    onBack(): void {
        this._router.navigate(['/country']);
    }

}
