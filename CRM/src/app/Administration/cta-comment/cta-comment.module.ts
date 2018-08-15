import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CTACommentService } from 'category/cta/cta-comment.service';
import { CTAService } from 'category/cta/cta.service';
//component
import {CTACommentHomeComponent} from './components/cta-comment-home.component';
import {CTACommentListComponent} from './components/cta-comment-list.component';
import {CTACommentModal} from './components/cta-comment-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CTACommentRoutingModule } from './cta-comment-routing.module';

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
        CTACommentRoutingModule
    ],
    declarations: [CTACommentHomeComponent, CTACommentListComponent,CTACommentModal],
    providers: [Service, CTACommentService,CTAService],
    entryComponents: [CTACommentModal]
})

export class CTACommentModule { }