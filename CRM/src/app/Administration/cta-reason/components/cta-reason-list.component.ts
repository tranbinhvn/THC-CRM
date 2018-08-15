import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTAReasonModal } from './cta-reason-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CTAReasonService } from 'category/cta/cta-reason.service';
// Model
import { ApiCTAReasonModel,CTAReasonCRUDModel,CTAReasonModel,ICTAReasonModel } from 'share-models/cta-reason.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/cta-reason-list.component.html',
})
export class CTAReasonListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    ctaReasons: Array<CTAReasonModel>;
    searchName: string;
    titleCTARea = ContantValues.TITLE_CTA_REASON;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCTARea: CTAReasonService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.ctaReasons = new Array<CTAReasonModel>();
    }

    ngOnInit(): void {
        this.getListCTAReason(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCTAReason(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCTARea.searchPaging<ICTAReasonModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCTARea.getListPaging<ICTAReasonModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICTAReasonModel[]>): void {
        this.notFoundData = ""; 
        this.ctaReasons.length = 0;
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
            this.ctaReasons.push(new CTAReasonModel(x));
        }
    }

    createCTAReason(){
        let ctaReason = new CTAReasonCRUDModel(null);
        const dialog = this.modal.open(CTAReasonModal, overlayConfigFactory({dataCtaRea: ctaReason, dataMessage: this.titleCTARea.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAReasonCRUDModel) => {
                if (!result) return;
            this._serviceCTARea.create<ApiCTAReasonModel>(new ApiCTAReasonModel(result, this.checkCredentials(),true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAReason(i: string){
        const dialog = this.modal.open(CTAReasonModal, overlayConfigFactory({dataCtaRea: this.ctaReasons[i], dataMessage: this.titleCTARea.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAReasonCRUDModel) => {
                if (!result) return;
            this._serviceCTARea.update<ApiCTAReasonModel>(new ApiCTAReasonModel(result, this.checkCredentials(),false)).subscribe(response => this.reloadData(response) );
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
        this._serviceCTARea.delete<ApiCTAReasonModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCTAReason(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
