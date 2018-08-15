import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CountryService } from 'category/country/country.service';
//component
import {CountryHomeComponent} from './components/country-home.component';
import {CountryListComponent} from './components/country-list.component';
import {CountryDetailComponent} from './components/country-detail.component';
import {CountryModal} from './components/country-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CountryRoutingModule } from './country-routing.module';

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
        CountryRoutingModule
    ],
    declarations: [CountryHomeComponent, CountryListComponent,CountryDetailComponent,CountryModal],
    providers: [Service, CountryService],
    entryComponents: [CountryModal]
})

export class CountryModule { }