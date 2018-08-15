import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTATypeModal } from './cta-type-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CTATypeService } from 'category/cta/cta-type.service';
// Model
import { ApiCTATypeModel,CTATypeCRUDModel,CTATypeModel,ICTATypeModel } from 'share-models/cta-type.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/cta-type-list.component.html',
})
export class CTATypeListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    ctaTypes: Array<CTATypeModel>;
    searchName: string;
    titleCTAType = ContantValues.TITLE_CTA_TYPE;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCTAType: CTATypeService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.ctaTypes = new Array<CTATypeModel>();
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
            this._serviceCTAType.searchPaging<ICTATypeModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCTAType.getListPaging<ICTATypeModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICTATypeModel[]>): void {
        this.notFoundData = "";
        this.ctaTypes.length = 0;
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
            this.ctaTypes.push(new CTATypeModel(x));
        }
    }

    createCTAType(){
        let ctaType = new CTATypeCRUDModel(null);
        const dialog = this.modal.open(CTATypeModal, overlayConfigFactory({dataCtaType: ctaType, dataMessage: this.titleCTAType.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTATypeCRUDModel) => {
                if (!result) return;
            this._serviceCTAType.create<ApiCTATypeModel>(new ApiCTATypeModel(result, this.checkCredentials(),true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAType(i: string){
        const dialog = this.modal.open(CTATypeModal, overlayConfigFactory({dataCtaType: this.ctaTypes[i], dataMessage: this.titleCTAType.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTATypeCRUDModel) => {
                if (!result) return;
            this._serviceCTAType.update<ApiCTATypeModel>(new ApiCTATypeModel(result, this.checkCredentials(),false)).subscribe(response => this.reloadData(response) );
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
        this._serviceCTAType.delete<ApiCTATypeModel>(id).subscribe(response => this.reloadData(response));
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
