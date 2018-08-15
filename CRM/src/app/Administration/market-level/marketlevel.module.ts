import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { MarketLevelService } from 'category/market-level/marketlevel.service';
//component
import {MarketLevelHomeComponent} from './components/marketlevel-home.component';
import {MarketLevelListComponent} from './components/marketlevel-list.component';
import {MarketLevelDetailComponent} from './components/marketlevel-detail.component';
import {MarketLevelModal} from './components/market-level-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { MarketLevelRoutingModule } from './marketlevel-routing.module';

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
        MarketLevelRoutingModule
    ],
    declarations: [MarketLevelHomeComponent,MarketLevelListComponent,MarketLevelDetailComponent,MarketLevelModal],
    providers: [Service, MarketLevelService],
    entryComponents: [MarketLevelModal]
})

export class MarketLevelModule { }