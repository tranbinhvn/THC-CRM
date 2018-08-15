import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modals
import { ModalModule } from 'angular2-modal';
// component
import { SettingHome } from './setting-home';
// module
import { SettingHomeRoutingModule } from './setting-home-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        SettingHomeRoutingModule,        
    ],
    declarations: [SettingHome],
    providers: []
})

export class SettingHomeModule {
}