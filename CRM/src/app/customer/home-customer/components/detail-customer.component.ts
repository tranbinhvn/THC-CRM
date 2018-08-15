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
import {CustomerService} from 'category/customers/customer.service';
// Model
import {ApiCustomerModel,CustomerCRUDModel,ICustomerCRUDModel} from 'share-models/customer.model';
@Component({
  selector: 'home-customer',
  templateUrl: './../pages/detail-customer.component.html'
})
export class DetailCustomerComponent {
  errorMessage: string;
  errorTranslate = "Error.";
  notFoundData: string = null;
  message: string;
  sub: any;
  submitted: boolean = false;;
  error: string;
  pageStatus: string = "init";
  customer: CustomerCRUDModel;
  constructor(
      public modal: Modal,
      private translate: TranslateService,
      public _route: ActivatedRoute, 
      public _router: Router,
      public _serviceCustomer: CustomerService,
  ){
      this.translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED) || ContantValues.LOCATION_LANGUAGE_DEFAULT);
      this.customer = new CustomerCRUDModel(null);
  }

  ngOnInit(): void {
      this.sub = this._route.params.subscribe(
          params => {
              let _id = params['id'];
              if (_id) {
                  this.getOneCustomer(_id);
              }
          });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  
   // Customer
   getOneCustomer(id: string){
      this._serviceCustomer.getOne<ICustomerCRUDModel>(id).subscribe(response => this.mappingAdmin(response));
  }

  mappingAdmin(data:ResponseModel<ICustomerCRUDModel>){
    if(data.errorCode == ContantValues.LOGIN_EXPIRED){
      this.alert("Login hết hiệu lực");
      this._router.navigate(['/login']);
    }
      this.notFoundData = "";
      if (data == null || data.result == null) {
          this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
          return;
      }

      this.customer = new CustomerCRUDModel(data.result);
  }

  save(adminFrom: any) {
      this.pageStatus = "submit";
      this.submitted = true;
      if (!adminFrom.valid) {
          return;
      }
      this._serviceCustomer.update<ApiCustomerModel>(new ApiCustomerModel(this.customer)).subscribe(
      response => this.message = response); 
     
  }

  alert(keyLang: string, title?: string) {
      let message = "";
      this.translate.get(keyLang).subscribe((result: string) => {
        message = result;
      });
      this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }

}


