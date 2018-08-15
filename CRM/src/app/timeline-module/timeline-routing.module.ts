import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {TimeLineHomeComponent} from './components/timeline-home.component';
import {TimelineComponent} from './components/timeline.component';
import {Timeline2Component} from './components/timeline2.component';
import {HorizontalComponent} from './components/horizontal.component';
const routes: Routes = [
    { path: '', component: TimeLineHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: TimelineComponent, canActivate: [AuthGuard]},
            {path: '2', component: Timeline2Component, canActivate: [AuthGuard]},
            {path: '3', component: HorizontalComponent, canActivate: [AuthGuard]},      
        ]
   },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class TimelineRoutingModule { }