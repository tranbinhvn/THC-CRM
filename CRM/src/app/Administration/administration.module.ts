import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modals
import { ModalModule } from 'angular2-modal';
// component
import { AdministraionComponent } from './administration.component';
// module
import { AdministrationRoutingModule } from './administration-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        AdministrationRoutingModule    
    ],
    declarations: [AdministraionComponent],
    providers: []
})

export class AdministrationModule {
}
