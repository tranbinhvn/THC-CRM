import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//services
import { Service } from 'api/service';
//component
import {TimeLineHomeComponent} from './components/timeline-home.component';
import {TimelineComponent} from './components/timeline.component';
import {Timeline2Component} from './components/timeline2.component';
import {HorizontalTimelineComponent} from './components/timeline3.component';
import {HorizontalComponent} from './components/horizontal.component';
//module
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { AlertConfirmModalModule } from 'alert-confirm/alert-confirm-modal.module';
import { from } from 'rxjs/observable/from';
import { TimelineRoutingModule } from './timeline-routing.module';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { Ng2Timeline } from 'ng2-timeline';

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
        TimelineRoutingModule,
        VerticalTimelineModule,
        Ng2Timeline,
    ],
    declarations: [TimeLineHomeComponent, TimelineComponent,Timeline2Component,HorizontalTimelineComponent,HorizontalComponent],
    providers: [Service,],
    entryComponents: []
})

export class TimelineModule { }