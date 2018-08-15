import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { ProductService } from 'category/product/product.service';
//component
import {ProductHomeComponent} from './components/product-home.component';
import {ProductListComponent} from './components/product-list.component';
import {ProductDetailComponent} from './components/product-detail.component';
import {ProductModal} from './components/product-crud-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { ProductRoutingModule } from './product-routing.module';

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
        ProductRoutingModule
    ],
    declarations: [ProductHomeComponent, ProductListComponent,ProductDetailComponent, ProductModal],
    providers: [Service, ProductService],
    entryComponents: [ProductModal]
})

export class ProductModule { }