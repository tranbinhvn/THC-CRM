import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTAPriorityModal } from './cta-priority-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CTAPriorityService } from 'category/cta/cta-priority.service';
// Model
import { ApiCTAPriorityModel,CTAPriorityCRUDModel,CTAPriorityModel,ICTAPriorityModel } from 'share-models/cta-priority.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/cta-priority-list.component.html',
})
export class CTAPriorityListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    ctaPrioritys: Array<CTAPriorityModel>;
    searchName: string;
    titleCTAPri = ContantValues.TITLE_CTA_PRIORITY;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCTAPri: CTAPriorityService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.ctaPrioritys = new Array<CTAPriorityModel>();
    }

    ngOnInit(): void {
        this.getListCTAPriority(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCTAPriority(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCTAPri.searchPaging<ICTAPriorityModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCTAPri.getListPaging<ICTAPriorityModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICTAPriorityModel[]>): void {
        this.notFoundData = ""; 
        this.ctaPrioritys.length = 0;
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
            this.ctaPrioritys.push(new CTAPriorityModel(x));
        }
    }

    createCTAPriority(){
        let ctaPriority = new CTAPriorityCRUDModel(null);
        const dialog = this.modal.open(CTAPriorityModal, overlayConfigFactory({dataCtaPri: ctaPriority, dataMessage: this.titleCTAPri.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAPriorityCRUDModel) => {
                if (!result) return;
            this._serviceCTAPri.create<ApiCTAPriorityModel>(new ApiCTAPriorityModel(result, this.checkCredentials(),true)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAPriority(i: string){
        const dialog = this.modal.open(CTAPriorityModal, overlayConfigFactory({dataCtaPri: this.ctaPrioritys[i], dataMessage: this.titleCTAPri.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTAPriorityCRUDModel) => {
                if (!result) return;
            this._serviceCTAPri.update<ApiCTAPriorityModel>(new ApiCTAPriorityModel(result, this.checkCredentials(),false)).subscribe(response => this.reloadData(response) );
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
        this._serviceCTAPri.delete<ApiCTAPriorityModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCTAPriority(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
