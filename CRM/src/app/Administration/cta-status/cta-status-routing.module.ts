import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CTAStatusHomeComponent} from './components/cta-status-home.component';
import {CTAStatusListComponent} from './components/cta-status-list.component';
const routes: Routes = [
    { path: '', component: CTAStatusHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CTAStatusListComponent, canActivate: [AuthGuard]},
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
export class CTAStatusRoutingModule { }