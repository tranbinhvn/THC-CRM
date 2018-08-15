import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { RegionService } from 'category/region/region.service';
//component
import {RegionHomeComponent} from './components/region-home.component';
import {RegionListComponent} from './components/region-list.component';
import {RegionDetailComponent} from './components/region-detail.component';
import {RegionModal} from './components/region-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { RegionRoutingModule } from './region-routing.module';

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
        RegionRoutingModule
    ],
    declarations: [RegionHomeComponent, RegionListComponent,RegionDetailComponent, RegionModal],
    providers: [Service, RegionService],
    entryComponents: [RegionModal]
})

export class RegionModule { }