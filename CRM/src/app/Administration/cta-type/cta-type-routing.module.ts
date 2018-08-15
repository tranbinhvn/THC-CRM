import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CTATypeHomeComponent} from './components/cta-type-home.component';
import {CTATypeListComponent} from './components/cta-type-list.component';
const routes: Routes = [
    { path: '', component: CTATypeHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CTATypeListComponent, canActivate: [AuthGuard]},
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
export class CTATypeRoutingModule { }