import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { AdminRoleService } from 'category/admin/admin-role.service';
import { AdminService } from 'category/admin/admin.service';
import { RoleService } from 'category/role/role.service';
//component
import {AdminRoleHomeComponent} from './components/admin-role-home.component';
import {AdminRoleListComponent} from './components/admin-role-list.component';
import {AdminRoleDetailComponent} from './components/admin-role-detail.component';
import {AdminRoleModal} from './components/admin-role-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { AdminRoleRoutingModule } from './admin-role-routing.module';

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
        AdminRoleRoutingModule
    ],
    declarations: [AdminRoleHomeComponent, AdminRoleListComponent,AdminRoleDetailComponent,AdminRoleModal],
    providers: [Service, AdminRoleService,AdminService,RoleService],
    entryComponents: [AdminRoleModal]
})

export class AdminRoleModule { }