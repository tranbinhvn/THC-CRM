import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {AdminRoleHomeComponent} from './components/admin-role-home.component';
import {AdminRoleListComponent} from './components/admin-role-list.component';
import {AdminRoleDetailComponent} from './components/admin-role-detail.component';
const routes: Routes = [
    { path: '', component: AdminRoleHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: AdminRoleListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: AdminRoleDetailComponent, canActivate: [AuthGuard]},
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
export class AdminRoleRoutingModule { }