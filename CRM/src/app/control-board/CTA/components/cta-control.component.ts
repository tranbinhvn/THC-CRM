import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTAModal } from './cta-control-crud-modal.component';
import { CTAViewtaskModal } from './cta-viewtask-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
// Service
import { CTAService } from 'app/sharedmodule/category/cta/cta.service';
import { CustomerCTAService } from 'category/customers/customercta.model';
// Model
import { ApiCTAModel, CTACRUDModel, CTAModel, ICTAModel } from 'share-models/cta.model';
import { CustomerCTAModel, ICustomerCTAModel } from 'share-models/customercta.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    selector: 'list',
    templateUrl: './../pages/cta-control.component.html'
})
export class ListComponent {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    searchName: string;
    translate: string;
    customerCTA: Array<CustomerCTAModel>;
    ctaDueDateList: Array<CTACRUDModel>;
    ctaEffectList: Array<CTACRUDModel>;
    ctas: Array<CTAModel>;
    titleCTA = ContantValues.TITLE_CTA;
    totalCTA: number;
    totalDudate: number;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute,
        public _router: Router,
        public _serviceCTA: CTAService,
        public _serviceCusCTS: CustomerCTAService,
    ) {
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.customerCTA = new Array<CustomerCTAModel>();
        this.ctaDueDateList = new Array<CTACRUDModel>();
        this.ctaEffectList = new Array<CTACRUDModel>();
        this.ctas = new Array<CTAModel>();
    }

    ngOnInit(): void {
       this.getListCustomerCTA();
       this.getListCTA();
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if (userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCustomerCTA() {
        this._serviceCusCTS.getList<ICustomerCTAModel>().subscribe(response => this.mappingCustomerCTA(response));
    }

    mappingCustomerCTA(data: ResponseModel<ICustomerCTAModel[]>) {
        this.notFoundData = "";
        if (data.errorCode == ContantValues.LOGIN_EXPIRED) {
            this.alert("Login hết hạn")
            this._router.navigate(['/login']);
        } 
        this.customerCTA.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return 
        }

        for (let x of data.result) {
            this.customerCTA.push(new CustomerCTAModel(x));
            // this.customerCTA[].ctaDueDateList[].length
        }
    }
    // CTA
    getListCTA() {
        this._serviceCTA.getList<ICTAModel>().subscribe(response => this.mappingCTA(response));
    }

    mappingCTA(data: ResponseModel<ICTAModel[]>) {
        this.notFoundData = "";
        if (data.errorCode == ContantValues.LOGIN_EXPIRED) {
            this.alert("Login hết hạn")
            this._router.navigate(['/login']);
        } 
        this.ctas.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return 
        }

        for (let x of data.result) {
            this.ctas.push(new CTAModel(x));
        }
        this.totalCTA = this.ctas.length;
    }

    // Create CTA
    createCTA() {
        let cta = new CTACRUDModel(null);
        const dialog = this.modal.open(CTAModal, overlayConfigFactory({ dataCTA: cta, dataMessage: this.titleCTA.find(s => { return s.key == 1 }).value || "" }, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACRUDModel) => {
                if (!result) return;
                this._serviceCTA.create<ApiCTAModel>(new ApiCTAModel(result, this.checkCredentials(), true)).subscribe(response => this.reloadData(response));
            });
        });
    }

    // Update CTA
    updateCTADD(i: string, j: string){
        const dialog = this.modal.open(CTAModal, overlayConfigFactory({dataCTA: this.customerCTA[i].ctaDueDateList[j], dataMessage: this.titleCTA.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACRUDModel) => {
                if (!result) return;
            this._serviceCTA.update<ApiCTAModel>(new ApiCTAModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAED(i: string, j: string){
        const dialog = this.modal.open(CTAModal, overlayConfigFactory({dataCTA: this.customerCTA[i].ctaEffectList[j], dataMessage: this.titleCTA.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACRUDModel) => {
                if (!result) return;
            this._serviceCTA.update<ApiCTAModel>(new ApiCTAModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }
    
    // Open Viewtask
    openViewtaskDd(i: string,j:string){
        const dialog = this.modal.open(CTAViewtaskModal, overlayConfigFactory({dataViewTask: this.customerCTA[i].ctaDueDateList[j], dataMessage: this.titleCTA.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACRUDModel) => {
                if (!result) return;
            this._serviceCTA.update<ApiCTAModel>(new ApiCTAModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    openViewtaskEf(i: string,j:string){
        const dialog = this.modal.open(CTAViewtaskModal, overlayConfigFactory({dataViewTask: this.customerCTA[i].ctaEffectList[j], dataMessage: this.titleCTA.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACRUDModel) => {
                if (!result) return;
            this._serviceCTA.update<ApiCTAModel>(new ApiCTAModel(result, this.checkCredentials(), false)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    delete(id: string): void {
        this._serviceCTA.delete<ApiCTAModel>(id).subscribe(response => this.reloadDelete(response));
    }

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }

    reloadDelete(response: string) {
        if (response == '0') {
            this.getListCustomerCTA();
            response = "Xóa thành công"
        }
        else {
            response = "Xóathất bại"
        }
        this.alert(response)
    }

    reloadData(response: string) {
        if (response == '0') {
            this.getListCustomerCTA();
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }
}
