import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CTAReasonService } from 'category/cta/cta-reason.service';
//component
import {CTAReasonHomeComponent} from './components/cta-reason-home.component';
import {CTAReasonListComponent} from './components/cta-reason-list.component';
import {CTAReasonModal} from './components/cta-reason-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CTAReasonRoutingModule } from './cta-reason-routing.module';

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
        CTAReasonRoutingModule
    ],
    declarations: [CTAReasonHomeComponent, CTAReasonListComponent,CTAReasonModal],
    providers: [Service, CTAReasonService],
    entryComponents: [CTAReasonModal]
})

export class CTAReasonModule { }