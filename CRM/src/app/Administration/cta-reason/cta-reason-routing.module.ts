import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CTAReasonHomeComponent} from './components/cta-reason-home.component';
import {CTAReasonListComponent} from './components/cta-reason-list.component';
const routes: Routes = [
    { path: '', component: CTAReasonHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CTAReasonListComponent, canActivate: [AuthGuard]},
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
export class CTAReasonRoutingModule { }