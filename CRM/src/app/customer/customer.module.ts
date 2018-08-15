import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modals
import { ModalModule } from 'angular2-modal';
// component
import { Customer } from './customer';
// module
import { CustomerRoutingModule } from './customer-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        CustomerRoutingModule,        
    ],
    declarations: [Customer],
    providers: []
})

export class CustomerModule {
}