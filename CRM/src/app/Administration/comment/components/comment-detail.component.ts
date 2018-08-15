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
import { CommentService } from 'category/comment/comment.service';
// Model
import {CommentCRUDModel,ICommentCRUDModel} from 'share-models/comment.model';
@Component({
    templateUrl: './../pages/comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit {
    notFoundData: string = null;
    errorMessage: string;
    message: string;
    sub: any;
    error: string;
    comment: CommentCRUDModel;
    constructor(
        private translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceComment: CommentService,
    ){
        this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
        this.comment = new CommentCRUDModel(null);
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let _id = params['id'];
                if (_id) {
                    this.getOneComment(_id);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getOneComment(_id: string){
        this._serviceComment.getOne<ICommentCRUDModel>(_id).subscribe(
            response => this.mappingData(response),
            error => this.errorMessage = <any>error,
        );
    }

    mappingData(data: ResponseModel<ICommentCRUDModel>){
        this.notFoundData = "";
        if (data == null || data.result == null) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
        this.comment = new CommentCRUDModel(data.result);
    }

    onBack(): void {
        this._router.navigate(['/comment']);
    }

}
