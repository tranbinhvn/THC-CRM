import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CustomerService } from 'category/customers/customer.service';
import { StatusService } from 'category/status/status.service';
//component
import {CustomersHomeComponent} from './components/customers-home.component';
import {CustomersListComponent} from './components/customers-list.component';
import {CustomersDetailComponent} from './components/customers-detail.component';
import {CustomerModal} from './components/customer-crud-modal';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CustomerRoutingModule } from './customers-routing.module';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        ReactiveFormsModule,
        TranslateI18nModule,
        AlertConfirmModalModule,
        CustomerRoutingModule,
    ],
    declarations: [CustomersHomeComponent, CustomerModal, CustomersListComponent,CustomersDetailComponent],
    providers: [Service, CustomerService, StatusService],
    entryComponents: [CustomerModal]
})

export class CustomersModule { }