import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//services
import { Service } from 'api/service';
import { TicketService } from 'category/ticket/ticket.service';
import { CustomerService } from 'category/customers/customer.service';
import { ContactService } from 'category/contact/contact.service';
import { ProductService } from 'category/product/product.service';
import { TickettypeService } from 'category/ticket/tickettype.service';
//component
import {TicketHomeComponent} from './components/ticket-home.component';
import {TicketListComponent} from './components/ticket-list.component';
import {TicketDetailComponent} from './components/ticket-detail.component';
import {TicketModal} from './components/ticket-create-update-modal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { TicketRoutingModule } from './ticket-routing.module';

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
        TicketRoutingModule
    ],
    declarations: [TicketHomeComponent, TicketListComponent,TicketDetailComponent,TicketModal],
    providers: [Service, TicketService, CustomerService,ContactService,ProductService,TickettypeService],
    entryComponents: [TicketModal]
})

export class TicketModule { }