import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { ChartsModule } from 'ng2-charts';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//services
import { Service } from 'api/service';
//component
import {EmployeesHomeComponent} from './components/employees-home.component';
import {EmployeesComponent} from './components/employees-control.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { EmployeesRoutingModule } from './employees-routing.module';

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
        EmployeesRoutingModule,
        NgbModule.forRoot(),    
    ],
    declarations: [EmployeesHomeComponent, EmployeesComponent],
    providers: [Service],
    entryComponents: []
})

export class EmployeesModule { }
