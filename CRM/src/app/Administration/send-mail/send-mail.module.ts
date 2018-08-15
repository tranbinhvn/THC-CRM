import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
//services
import { Service } from 'api/service';
import { SendMailService } from 'category/send-mail/send-mail.service';
//component
import {SendMailHomeComponent} from './components/send-mail-home.component';
import {SendMailComponent} from './components/send-mail.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { SendMailRoutingModule } from './send-mail-routing.module';

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
        SendMailRoutingModule,
        CKEditorModule
    ],
    declarations: [SendMailHomeComponent, SendMailComponent],
    providers: [Service,SendMailService],
    entryComponents: []
})

export class SendMailModule { }