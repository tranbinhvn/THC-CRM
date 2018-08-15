import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { ContractModal } from './contract-crud-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { ContractService } from 'category/contract/contract.service';
// Model
import { ApiContractModel,IContractCRUDModel,ContractCRUDModel} from 'share-models/contract.model';
import { CredentialsLogin } from 'app/login-module/credentials-login';
@Component({
    templateUrl: './../pages/contract-list.component.html',
})
export class ContractListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    contracts: Array<ContractCRUDModel>;
    searchName: string;
    titleContract = ContantValues.TITLE_CONTRACT;
    constructor(
        public login: CredentialsLogin,
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceContract: ContractService,
    ){
        translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.contracts = new Array<ContractCRUDModel>();
    }

    ngOnInit(): void {
        this.getListContract(this.pageSelect);
    }

    getListContract(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceContract.searchPaging<IContractCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceContract.getListPaging<IContractCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<IContractCRUDModel[]>): void {
        this.notFoundData = "";
        this.contracts.length = 0;
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
            this.contracts.push(new ContractCRUDModel(x));
        }
    }

    createContract(){
        let contract = new ContractCRUDModel(null);
        const dialog = this.modal.open(ContractModal, overlayConfigFactory({dataContract: contract, dataMessage: this.titleContract.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: ContractCRUDModel) => {
                if (!result) return;
            this._serviceContract.create<ApiContractModel>(new ApiContractModel(result, this.login.getCredentials())).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateContract(i: string){
        const dialog = this.modal.open(ContractModal, overlayConfigFactory({dataContract: this.contracts[i], dataMessage: this.titleContract.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: ContractCRUDModel) => {
                if (!result) return;
            this._serviceContract.update<ApiContractModel>(new ApiContractModel(result, this.login.getCredentials())).subscribe(response => this.reloadData(response) );
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
        this._serviceContract.delete<ApiContractModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListContract(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }


}
