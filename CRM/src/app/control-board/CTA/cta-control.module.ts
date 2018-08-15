import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import {DropdownModule} from "ng2-dropdown";
//services
import { Service } from 'api/service';
import { CTAService } from 'app/sharedmodule/category/cta/cta.service';
import { CustomerCTAService } from 'category/customers/customercta.model';
import { CTACommentService } from 'category/cta/cta-comment.service';
import { CTAPriorityService } from 'category/cta/cta-priority.service';
import { CTAReasonService } from 'category/cta/cta-reason.service';
import { CTAStatusService } from 'category/cta/cta-status.service';
import { CTATypeService } from 'category/cta/cta-type.service';
import { CustomerService } from 'category/customers/customer.service';
import { AdminService } from 'category/admin/admin.service';
//component
import {ListControlHomeComponent} from './components/cta-control-home.component';
import {ListComponent} from './components/cta-control.component';
import {CTAViewtaskModal} from './components/cta-viewtask-modal.component';
import {PlaybookComponent} from './components/cta-playbook.component';
import {CTAModal} from './components/cta-control-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { ListControlRoutingModule } from './cta-control-routing';
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        ReactiveFormsModule,
        TranslateI18nModule,
        CKEditorModule,
        AlertConfirmModalModule,
        ListControlRoutingModule,
        DropdownModule,
    ],
    declarations: [ListControlHomeComponent,ListComponent,CTAViewtaskModal,PlaybookComponent,CTAModal],
    providers: [Service,CTAService,CTACommentService,CTAPriorityService,CTAReasonService,CTAStatusService,CTATypeService,CustomerService,AdminService, CustomerCTAService],
    entryComponents: [CTAModal,CTAViewtaskModal]
})

export class CTAControlModule { }