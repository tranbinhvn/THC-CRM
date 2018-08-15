import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CTAStatusService } from 'category/cta/cta-status.service';
//component
import {CTAStatusHomeComponent} from './components/cta-status-home.component';
import {CTAStatusListComponent} from './components/cta-status-list.component';
import {CTAStatusModal} from './components/cta-status-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CTAStatusRoutingModule } from './cta-status-routing.module';

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
        CTAStatusRoutingModule
    ],
    declarations: [CTAStatusHomeComponent, CTAStatusListComponent,CTAStatusModal],
    providers: [Service, CTAStatusService],
    entryComponents: [CTAStatusModal]
})

export class CTAStatusModule { }