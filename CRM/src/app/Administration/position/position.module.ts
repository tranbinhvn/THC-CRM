import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { PositionService } from 'category/position/position.service';
//component
import {PositionHomeComponent} from './components/position-home.component';
import {PositionListComponent} from './components/position-list.component';
import {PositionDetailComponent} from './components/position-detail.component';
import {PositionModal} from './components/position-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { PositionRoutingModule } from './position-routing.module';

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
        PositionRoutingModule
    ],
    declarations: [PositionHomeComponent, PositionListComponent,PositionDetailComponent,PositionModal],
    providers: [Service, PositionService],
    entryComponents: [PositionModal]
})

export class PositionModule { }