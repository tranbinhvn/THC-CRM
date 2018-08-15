import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CTACommentModal } from './cta-comment-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CTACommentService } from 'category/cta/cta-comment.service';
// Model
import { ApiCTACommentModel,CTACommentCRUDModel,ICTACommentCRUDModel } from 'share-models/cta-comment.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/cta-comment-list.component.html',
})
export class CTACommentListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    ctaComments: Array<CTACommentCRUDModel>;
    searchName: string;
    titleCTACom = ContantValues.TITLE_CTA_COMMENT;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceCTACom: CTACommentService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.ctaComments = new Array<CTACommentCRUDModel>();
    }

    ngOnInit(): void {
        this.getListCTAComment(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListCTAComment(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceCTACom.searchPaging<ICTACommentCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceCTACom.getListPaging<ICTACommentCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICTACommentCRUDModel[]>): void {
        this.notFoundData = "";
        this.ctaComments.length = 0;
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
            this.ctaComments.push(new CTACommentCRUDModel(x));
        }
    }

    createCTAComment(){
        let ctaComment = new CTACommentCRUDModel(null);
        const dialog = this.modal.open(CTACommentModal, overlayConfigFactory({dataCtaCom: ctaComment, dataMessage: this.titleCTACom.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACommentCRUDModel) => {
                if (!result) return;
            this._serviceCTACom.create<ApiCTACommentModel>(new ApiCTACommentModel(result, this.checkCredentials())).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCTAComment(i: string){
        const dialog = this.modal.open(CTACommentModal, overlayConfigFactory({dataCtaCom: this.ctaComments[i], dataMessage: this.titleCTACom.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CTACommentCRUDModel) => {
                if (!result) return;
            this._serviceCTACom.update<ApiCTACommentModel>(new ApiCTACommentModel(result, this.checkCredentials())).subscribe(response => this.reloadData(response) );
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
        this._serviceCTACom.delete<ApiCTACommentModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListCTAComment(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }

}
