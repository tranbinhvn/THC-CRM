import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';
//services
import { Service } from 'api/service';
//component
import {DashSettingHomeComponent} from './components/dashboard-setting-home.component';
import {DashboardSettingComponent} from './components/dashboard-setting.component';
import {EditSettingComponent} from './components/edit-setting.component';
import {NotificationSettingComponent} from './components/notification-setting.component';
import {AddNewSettingComponent} from './components/add-new.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { DashboardSettingRoutingModule } from './dashboard-setting-routing';
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
        DashboardSettingRoutingModule,
        NgDragDropModule.forRoot()
    ],
    declarations: [DashSettingHomeComponent,DashboardSettingComponent,EditSettingComponent,NotificationSettingComponent,AddNewSettingComponent],
    providers: [Service],
    entryComponents: []
})

export class DashboardSettingModule { }