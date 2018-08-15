import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { StatusService } from 'category/status/status.service';
//component
import {StatusHomeComponent} from './components/status-home.component';
import {StatusListComponent} from './components/status-list.component';
import {StatusDetailComponent} from './components/status-detail.component';
import {StatusModal} from './components/status-create-update-modal.component'
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { StatusRoutingModule } from './status-routing.module';

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
        StatusRoutingModule,
    ],
    declarations: [StatusHomeComponent, StatusListComponent,StatusDetailComponent, StatusModal],
    providers: [Service, StatusService],
    entryComponents: [StatusModal]
})

export class StatusModule { }