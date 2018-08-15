import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { RoleService } from 'category/role/role.service';
//component
import {RoleHomeComponent} from './components/role-home.component';
import {RoleListComponent} from './components/role-list.component';
import {RoleDetailComponent} from './components/role-detail.component';
import {RoleModal} from './components/role-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { RoleRoutingModule } from './role-routing.module';

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
        RoleRoutingModule
    ],
    declarations: [RoleHomeComponent, RoleListComponent,RoleDetailComponent,RoleModal],
    providers: [Service, RoleService],
    entryComponents: [RoleModal]
})

export class RoleModule { }