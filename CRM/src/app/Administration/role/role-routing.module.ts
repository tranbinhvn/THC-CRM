import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {RoleHomeComponent} from './components/role-home.component';
import {RoleListComponent} from './components/role-list.component';
import {RoleDetailComponent} from './components/role-detail.component';
const routes: Routes = [
    { path: '', component: RoleHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: RoleListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: RoleDetailComponent, canActivate: [AuthGuard]},
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
export class RoleRoutingModule { }