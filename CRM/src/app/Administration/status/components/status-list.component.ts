import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { StatusModal } from './status-create-update-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { StatusService } from 'category/status/status.service';
// Model
import {ApiStatusModel,IStatusModel,StatusModel,StatusCRUDModel} from 'share-models/status.model';
@Component({
    templateUrl: './../pages/status-list.component.html',
})
export class StatusListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    searchName: string;
    status: Array<StatusModel>;
    cuStatus: StatusCRUDModel;
    titleSta = ContantValues.TITLE_STATUS;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceStatus: StatusService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.status = new Array<StatusModel>();
        this.cuStatus = new StatusCRUDModel(null);
    }

    ngOnInit(): void {
        this.getListStatus(this.pageSelect);
    }

    getListStatus(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceStatus.searchPaging<IStatusModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceStatus.getListPaging<IStatusModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
    } 
    
    mappingData(data: ResponseModel<IStatusModel[]>): void {
        this.notFoundData = "";
        if (data.errorCode == ContantValues.LOGIN_EXPIRED) {
            this.alert("Login hết hạn")
            this._router.navigate(['/login']);
        } 
        this.status.length = 0;
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
            this.status.push(new StatusModel(x));
        }
    }

    createStatus(){
        const dialog = this.modal.open(StatusModal, overlayConfigFactory({dataStatus: this.cuStatus, dataMessage: this.titleSta.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: StatusCRUDModel) => {
                if (!result) return;
            this._serviceStatus.create<StatusCRUDModel>(new StatusCRUDModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateStatus(i: string){
        const dialog = this.modal.open(StatusModal, overlayConfigFactory({dataStatus: this.status[i], dataMessage: this.titleSta.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: StatusCRUDModel) => {
                if (!result) return;
            this._serviceStatus.update<ApiStatusModel>(new ApiStatusModel(result)).subscribe(response => this.reloadData(response) );
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
        this._serviceStatus.delete<ApiStatusModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListStatus(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }


}
