import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { AdminLocationService } from 'category/admin/admin-location.service';
import { AdminService } from 'category/admin/admin.service';
import { CountryService } from 'category/country/country.service';
import { RegionService } from 'category/region/region.service';
//component
import {AdminLocationHomeComponent} from './components/admin-location-home.component';
import {AdminLocationListComponent} from './components/admin-location-list.component';
import {AdminLocationDetailComponent} from './components/admin-location-detail.component';
import { AdminLocaltionModal } from './components/admin-location-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { AdminLocationRoutingModule } from './admin-location-routing.module';

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
        AdminLocationRoutingModule
    ],
    declarations: [AdminLocationHomeComponent, AdminLocationListComponent,AdminLocationDetailComponent,AdminLocaltionModal],
    providers: [Service, AdminLocationService,AdminService,CountryService,RegionService],
    entryComponents: [AdminLocaltionModal]
})

export class AdminLocationModule { }