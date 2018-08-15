import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CTAPriorityService } from 'category/cta/cta-priority.service';
//component
import {CTAPriorityHomeComponent} from './components/cta-priority-home.component';
import {CTAPriorityListComponent} from './components/cta-priority-list.component';
import {CTAPriorityModal} from './components/cta-priority-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CTAPriorityRoutingModule } from './cta-priority-routing.module';

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
        CTAPriorityRoutingModule
    ],
    declarations: [CTAPriorityHomeComponent, CTAPriorityListComponent,CTAPriorityModal],
    providers: [Service, CTAPriorityService],
    entryComponents: [CTAPriorityModal]
})

export class CTAPriorityModule { }