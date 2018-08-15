import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTAStatusModal } from './cta-status-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CTAStatusService } from 'category/cta/cta-status.service';
// Model
import { ApiCTAStatusModel,CTAStatusCRUDModel,CTAStatusModel,ICTAStatusModel } from 'share-models/cta-status.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/cta-status-list.component.html',
})
export class CTAStatusListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    ctaStatuss: Array<CTAStatusCRUDModel>;
    searchName: string;
    titleCTASta = ContantValues.TITLE_CTA_STATUS;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCTASta: CTAStatusService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.ctaStatuss = new Array<CTAStatusCRUDModel>();
    }

    ngOnInit(): void {
        this.getListCTAStatus(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCTAStatus(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCTASta.searchPaging<ICTAStatusModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCTASta.getListPaging<ICTAStatusModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICTAStatusModel[]>): void {
        this.notFoundData = "";
        this.ctaStatuss.length = 0;
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
            this.ctaStatuss.push(new CTAStatusModel(x));
        }
    }

    createCTAStatus(){
        let ctaStatus = new CTAStatusCRUDModel(null);
        const dialog = this.modal.open(CTAStatusModal, overlayConfigFactory({dataCtaSta: ctaStatus, dataMessage: this.titleCTASta.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAStatusCRUDModel) => {
                if (!result) return;
            this._serviceCTASta.create<ApiCTAStatusModel>(new ApiCTAStatusModel(result, this.checkCredentials(),true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAStatus(i: string){
        const dialog = this.modal.open(CTAStatusModal, overlayConfigFactory({dataCtaSta: this.ctaStatuss[i], dataMessage: this.titleCTASta.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAStatusCRUDModel) => {
                if (!result) return;
            this._serviceCTASta.update<ApiCTAStatusModel>(new ApiCTAStatusModel(result, this.checkCredentials(),false)).subscribe(response => this.reloadData(response) );
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
        this._serviceCTASta.delete<ApiCTAStatusModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCTAStatus(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
