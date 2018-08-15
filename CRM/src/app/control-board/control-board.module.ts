import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modals
import { ModalModule } from 'angular2-modal';
// component
import { ControlBoard } from './control-board';
// module
import { ControlBoardRoutingModule } from './control-board-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        ControlBoardRoutingModule,        
    ],
    declarations: [ControlBoard],
    providers: []
})

export class ControlBoardModule {
}