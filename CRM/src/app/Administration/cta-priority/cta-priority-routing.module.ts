import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CTAPriorityHomeComponent} from './components/cta-priority-home.component';
import {CTAPriorityListComponent} from './components/cta-priority-list.component';
const routes: Routes = [
    { path: '', component: CTAPriorityHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CTAPriorityListComponent, canActivate: [AuthGuard]},
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
export class CTAPriorityRoutingModule { }