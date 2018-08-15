import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { CommentModal } from './comment-create-update-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CommentService } from 'category/comment/comment.service';
// Model
import {ApiCommentModel,CommentCRUDModel,ICommentCRUDModel} from 'share-models/comment.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/comment-list.component.html',
})
export class CommentListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    comments: Array<CommentCRUDModel>;
    titleCom = ContantValues.TITLE_COMMENT;
    searchName: string;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceComment: CommentService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.comments = new Array<CommentCRUDModel>();
       
    }

    ngOnInit(): void {
        this.getListComment(this.pageSelect);
    }

    checkCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }

    getListComment(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceComment.searchPaging<ICommentCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceComment.getListPaging<ICommentCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ICommentCRUDModel[]>): void {
        this.notFoundData = "";
        this.comments.length = 0;
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
            this.comments.push(new CommentCRUDModel(x));
        }
    }

    createComment(){
        let comment = new CommentCRUDModel(null);
        const dialog = this.modal.open(CommentModal, overlayConfigFactory({dataComment: comment, dataMessage: this.titleCom.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CommentCRUDModel) => {
                if (!result) return;
            this._serviceComment.create<ApiCommentModel>(new ApiCommentModel(result, this.checkCredentials())).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateComment(i: string){
        const dialog = this.modal.open(CommentModal, overlayConfigFactory({dataComment: this.comments[i], dataMessage: this.titleCom.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: CommentCRUDModel) => {
                if (!result) return;
            this._serviceComment.update<ApiCommentModel>(new ApiCommentModel(result, this.checkCredentials())).subscribe(response => this.reloadData(response) );
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
        this.checkCredentials();
        this._serviceComment.delete<ApiCommentModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListComment(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }


}
