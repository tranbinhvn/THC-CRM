import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { AdminPositionService } from 'category/admin/admin-position.service';
import { AdminService } from 'category/admin/admin.service';
import { PositionService } from 'category/position/position.service';
//component
import {AdminPositionHomeComponent} from './components/admin-position-home.component';
import {AdminPositionListComponent} from './components/admin-position-list.component';
import {AdminPositionDetailComponent} from './components/admin-position-detail.component';
import {AdminPositionModal} from './components/admin-position-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { AdminPositionRoutingModule } from './admin-position-routing.module';

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
        AdminPositionRoutingModule
    ],
    declarations: [AdminPositionHomeComponent, AdminPositionListComponent,AdminPositionDetailComponent,AdminPositionModal],
    providers: [Service, AdminPositionService,PositionService,AdminService],
    entryComponents: [AdminPositionModal]
})

export class AdminPositionModule { }