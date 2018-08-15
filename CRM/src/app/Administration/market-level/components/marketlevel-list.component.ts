import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { MarketLevelModal } from './market-level-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { MarketLevelService } from 'category/market-level/marketlevel.service';
// Model
import {ApiMarketLevelModel,IMarketLevelModel,MarketLevelModel,MarketLevelCRUDModel} from 'share-models/market-level.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/marketlevel-list.component.html',
})
export class MarketLevelListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    marketLevels: Array<MarketLevelModel>;
    searchName: string;
    titleMarLev = ContantValues.TITLE_MARKET_LEVEL;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceMarketLevel: MarketLevelService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.marketLevels = new Array<MarketLevelModel>();
    }

    ngOnInit(): void {
        this.getListMarketLevel(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListMarketLevel(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceMarketLevel.searchPaging<IMarketLevelModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceMarketLevel.getListPaging<IMarketLevelModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
    } 
    
    mappingData(data: ResponseModel<IMarketLevelModel[]>): void {
        this.notFoundData = "";
        this.marketLevels.length = 0;
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
            this.marketLevels.push(new MarketLevelModel(x));
        }
    }

    createMarketLevel(){
        let marketLevel = new MarketLevelCRUDModel(null);
        const dialog = this.modal.open(MarketLevelModal, overlayConfigFactory({dataMarketLevel: marketLevel, dataMessage: this.titleMarLev.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: MarketLevelCRUDModel) => {
                if (!result) return;
            this._serviceMarketLevel.create<ApiMarketLevelModel>(new ApiMarketLevelModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateMarketLevel(i: string){
        const dialog = this.modal.open(MarketLevelModal, overlayConfigFactory({dataMarketLevel: this.marketLevels[i], dataMessage: this.titleMarLev.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: MarketLevelCRUDModel) => {
                if (!result) return;
            this._serviceMarketLevel.update<ApiMarketLevelModel>(new ApiMarketLevelModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
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
        this._serviceMarketLevel.delete<ApiMarketLevelModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListMarketLevel(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
