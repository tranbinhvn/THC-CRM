import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { CustomerService } from 'category/customers/customer.service';
// Model
import { CustomerModel,ICustomerModel   } from 'share-models/customer.model';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
import { Customer } from 'app/customer/customer';
@Component({
  selector: 'home-customer',
  templateUrl: './../pages/home-customer.component.html'
})
export class HomeCustomerComponent {
  errorMessage: string;
  totalRecords: Array<number>;
  notFoundData: string = null;
  pageSelect: number = 1;
  pagesTotal: number = 1;
  message: string;
  size: number = 10;
  customers: Array<CustomerModel>;
  totalCustomer: number;
  constructor(
    public modal: Modal,
    translate: TranslateService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _serviceCustomer: CustomerService,
  ) {
    translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
    this.totalRecords = new Array<number>();
    this.customers = new Array<CustomerModel>();
  }

  ngOnInit(): void {
    this.getListCustomer(this.pageSelect);
  }

  checkCredentials() {
    let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
    if (userLogin === null) {
      this._router.navigate(['/login']);
      return;
    }
    return userLogin.id;
  }

  getListCustomer(pageSelect: number): void {
    if (pageSelect < 1 || pageSelect > this.pagesTotal) {
      return;
    }
    this.pageSelect = pageSelect;
      this._serviceCustomer.getListPaging<ICustomerModel>(this.pageSelect, this.size).subscribe(response => this.mappingData(response)
        , error => this.errorMessage = <any>error)
  
  }

  mappingData(data: ResponseModel<ICustomerModel[]>): void {
    this.notFoundData = "";
    if (data.errorCode == ContantValues.LOGIN_EXPIRED) {
      this.alert("Login hết hạn")
      this._router.navigate(['/login']);
    }
    this.customers.length = 0;
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
      this.customers.push(new CustomerModel(x));
    }
    this.totalCustomer = this.customers.length;
  }

  alert(keyLang: string, title?: string) {
    let message = keyLang;
    // this.translate.get(keyLang).subscribe((result: string) => {
    //   message = result;
    // });
    this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
  }

}
