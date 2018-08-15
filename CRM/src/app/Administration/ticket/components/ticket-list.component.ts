import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
import { TicketModal } from './ticket-create-update-modal.component';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { TicketService } from 'category/ticket/ticket.service';
// Model
import { ApiTicketModel,ITicketCRUDModel,TicketCRUDModel } from 'share-models/ticket.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Component({
    templateUrl: './../pages/ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
    errorMessage: string;
    totalRecords: Array<number>;
    notFoundData: string = null;
    pageSelect: number = 1;
    pagesTotal: number = 1;
    message: string;
    size: number = 10;
    tickets: Array<TicketCRUDModel>;
    searchName: string;
    titleTic = ContantValues.TITLE_TICKET;
    constructor(
        public modal: Modal,
        translate: TranslateService,
        public _route: ActivatedRoute, 
        public _router: Router,
        public _serviceTicket: TicketService,
    ){
        //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
        this.totalRecords = new Array<number>();
        this.tickets = new Array<TicketCRUDModel>();
    }

    ngOnInit(): void {
        this.getListTicket(this.pageSelect);
    }

    getListTicket(pageSelect: number): void {
        if (pageSelect < 1 || pageSelect > this.pagesTotal) {
            return;
        }
        this.pageSelect = pageSelect;
        if (this.searchName) {
            this._serviceTicket.searchPaging<ITicketCRUDModel>(this.searchName,this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        } else {
            this._serviceTicket.getListPaging<ITicketCRUDModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
            , error => this.errorMessage = <any>error)
        }
        
    } 
    
    mappingData(data: ResponseModel<ITicketCRUDModel[]>): void {
        this.notFoundData = "";
        if (data.errorCode == ContantValues.LOGIN_EXPIRED) {
            this.alert("Login hết hạn")
            this._router.navigate(['/login']);
        } 
        this.tickets.length = 0;
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
            this.tickets.push(new TicketCRUDModel(x));
        }
    }

    createCustomer(){
        let ticket = new TicketCRUDModel(null);
        const dialog = this.modal.open(TicketModal, overlayConfigFactory({dataTicket: ticket,dataMessage: this.titleTic.find(s =>{return s.key == 1}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: TicketCRUDModel) => {
                if (!result) return;
            this._serviceTicket.create<ApiTicketModel>(new ApiTicketModel(result)).subscribe(response => this.reloadData(response) );
            });
        });
    }

    updateCustomer(i: string){
        const dialog = this.modal.open(TicketModal, overlayConfigFactory({dataTicket: this.tickets[i],dataMessage: this.titleTic.find(s =>{return s.key == 2}).value || ""}, BSModalContext));
        dialog.then((resultPromise: any) => {
            return resultPromise.result.then((result: TicketCRUDModel) => {
                if (!result) return;
            this._serviceTicket.update<ApiTicketModel>(new ApiTicketModel(result)).subscribe(response => this.reloadData(response) );
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
        this._serviceTicket.delete<ApiTicketModel>(id).subscribe(response => this.reloadData(response));
    }

    reloadData(response: string) {
        if(response == '0')
        {
            this.getListTicket(this.pageSelect);
            response = "Thêm mới thành công"
        }
        else {
            response = "Thêm mới thất bại"
        }
        this.alert(response)
    }



}
