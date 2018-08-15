import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CustomerService } from 'category/customers/customer.service';
//component
import {HomeCustomerHomeComponent} from './components/home-customer-home.component';
import {HomeCustomerComponent} from './components/home-customer.component';
import {DetailCustomerComponent} from './components/detail-customer.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { HomeCustomerRoutingModule } from './home-customer-routing';
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
        HomeCustomerRoutingModule
    ],
    declarations: [HomeCustomerHomeComponent,HomeCustomerComponent,DetailCustomerComponent],
    providers: [Service,CustomerService],
    entryComponents: []
})

export class HomeCustomerModule { }