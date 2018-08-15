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
import {SettingHomeComponent} from './components/setting-home.component';
import {SettingDashboardComponent} from './components/setting-dashboard.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { SettingRoutingModule } from './setting-routing.module';

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
        SettingRoutingModule
    ],
    declarations: [SettingHomeComponent, SettingDashboardComponent],
    providers: [Service, AdminService],
    entryComponents: []
})

export class SettingModule { }
