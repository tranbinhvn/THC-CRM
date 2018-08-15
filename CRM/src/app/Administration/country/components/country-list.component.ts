import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CountryModal } from './country-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CountryService } from 'category/country/country.service';
// Model
import {ApiCountryModel,CountryModel,ICountryModel,CountryCRUDModel} from 'share-models/country.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/country-list.component.html',
})
export class CountryListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    countrys: Array<CountryModel>;
    searchName: string;
    titleCountry = ContantValues.TITLE_COUNTRY;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCountry: CountryService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.countrys = new Array<CountryModel>();
    }

    ngOnInit(): void {
        this.getListCountry(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCountry(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCountry.searchPaging<ICountryModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCountry.getListPaging<ICountryModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICountryModel[]>): void {
        this.notFoundData = "";
        this.countrys.length = 0;
        this.totalRecords.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        this.pagesTotal = data.totalPage;
        for (var index = 1; index <= this.pagesTotal; index++) {
            this.totalRecords.push(index);
        }

        for (let x of data.result) {
            this.countrys.push(new CountryModel(x));
        }
    }

    createCountry(){
        let country = new CountryCRUDModel(null);
        const dialog = this.modal.open(CountryModal, overlayConfigFactory({dataCountry: country, dataMessage: this.titleCountry.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CountryCRUDModel) => {
                if (!result) return;
            this._serviceCountry.create<ApiCountryModel>(new ApiCountryModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCountry(i: string){
        const dialog = this.modal.open(CountryModal, overlayConfigFactory({dataCountry: this.countrys[i], dataMessage: this.titleCountry.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CountryCRUDModel) => {
                if (!result) return;
            this._serviceCountry.update<ApiCountryModel>(new ApiCountryModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }

    delete(id: string): void {
        this._serviceCountry.delete<ApiCountryModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCountry(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }


}
