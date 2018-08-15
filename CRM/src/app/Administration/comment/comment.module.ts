import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CommentService } from 'category/comment/comment.service';
import { CustomerService } from 'category/customers/customer.service';
//component
import {CommentHomeComponent} from './components/comment-home.component';
import {CommentListComponent} from './components/comment-list.component';
import {CommentDetailComponent} from './components/comment-detail.component';
import { CommentModal } from './components/comment-create-update-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CommentRoutingModule } from './comment-routing.module';

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
        CommentRoutingModule
    ],
    declarations: [CommentHomeComponent, CommentListComponent,CommentDetailComponent,CommentModal],
    providers: [Service, CommentService,CustomerService],
    entryComponents: [CommentModal]
})

export class CommentModule { }