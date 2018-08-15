import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { AdminService } from 'app/sharedmodule/category/admin/admin.service';
//component
import {AdminHomeComponent} from './components/admin-home.component';
import {AdminListComponent} from './components/admin-list.component';
import {AdminDetailComponent} from './components/admin-detail.component';
import {AdminModal} from './components/admin-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { AdminRoutingModule } from './admin-routing.module';
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
        AdminRoutingModule,
    ],
    declarations: [AdminHomeComponent, AdminModal, AdminListComponent,AdminDetailComponent],
    providers: [Service, AdminService],
    entryComponents: [AdminModal]
})

export class AdminModule { }
