import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { ContractService } from 'category/contract/contract.service';
import { CustomerService } from 'category/customers/customer.service';
import { ContactService } from 'category/contact/contact.service';
import { AdminService } from 'category/admin/admin.service';
import { CredentialsLogin } from 'app/login-module/credentials-login';
//component
import {ContractHomeComponent} from './components/contract-home.component';
import {ContractListComponent} from './components/contract-list.component';
import {ContractDetailComponent} from './components/contract-detail.component';
import {ContractModal} from './components/contract-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { ContractRoutingModule } from './contract-routing.module';

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
        ContractRoutingModule
    ],
    declarations: [ContractHomeComponent,ContractListComponent,ContractModal,ContractDetailComponent],
    providers: [Service, ContractService, CustomerService,ContactService,CredentialsLogin,AdminService],
    entryComponents: [ContractModal]
})

export class ContractModule { }