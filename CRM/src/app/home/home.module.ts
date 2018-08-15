import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// modals
import { ModalModule } from 'angular2-modal';
// component
import { HomeComponent } from './home.component';
import { HomeParentComponent } from './home-parent.component';
// module
import { HomeRoutingModule } from './home-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        HomeRoutingModule,
        ChartsModule,
        NgbModule.forRoot(),    
    ],
    declarations: [HomeComponent,HomeParentComponent],
    providers: []
})

export class HomeModule {
}
