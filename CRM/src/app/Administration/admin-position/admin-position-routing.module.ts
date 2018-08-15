import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {AdminPositionHomeComponent} from './components/admin-position-home.component';
import {AdminPositionListComponent} from './components/admin-position-list.component';
import {AdminPositionDetailComponent} from './components/admin-position-detail.component';
const routes: Routes = [
    { path: '', component: AdminPositionHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: AdminPositionListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: AdminPositionDetailComponent, canActivate: [AuthGuard]},
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
export class AdminPositionRoutingModule { }