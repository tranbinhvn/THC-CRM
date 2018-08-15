import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { AdminMarketLevelService } from 'category/admin/admin-market-level.service';
import { AdminService } from 'category/admin/admin.service';
import { MarketLevelService } from 'category/market-level/marketlevel.service';
//component
import {AdminMarketLevelHomeComponent} from './components/admin-market-level-home.component';
import {AdminMarketLevelListComponent} from './components/admin-market-level-list.component';
import {AdminMarketLevelDetailComponent} from './components/admin-market-level-detail.component';
import {AdminMarketLevelModal} from './components/admin-market-level-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { AdminMarketLevelRoutingModule } from './admin-market-level-routing.module';

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
        AdminMarketLevelRoutingModule
    ],
    declarations: [AdminMarketLevelHomeComponent, AdminMarketLevelListComponent,AdminMarketLevelDetailComponent,AdminMarketLevelModal],
    providers: [Service, AdminMarketLevelService,AdminService,MarketLevelService],
    entryComponents: [AdminMarketLevelModal]
})

export class AdminMarketLevelModule { }