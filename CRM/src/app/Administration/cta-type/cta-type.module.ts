import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { CTATypeService } from 'category/cta/cta-type.service';
//component
import {CTATypeHomeComponent} from './components/cta-type-home.component';
import {CTATypeListComponent} from './components/cta-type-list.component';
import {CTATypeModal} from './components/cta-type-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { CTATypeRoutingModule } from './cta-type-routing.module';

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
        CTATypeRoutingModule
    ],
    declarations: [CTATypeHomeComponent, CTATypeListComponent,CTATypeModal],
    providers: [Service, CTATypeService],
    entryComponents: [CTATypeModal]
})

export class CTATypeModule { }