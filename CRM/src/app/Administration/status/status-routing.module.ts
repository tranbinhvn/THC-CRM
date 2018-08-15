import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {StatusHomeComponent} from './components/status-home.component';
import {StatusListComponent} from './components/status-list.component';
import {StatusDetailComponent} from './components/status-detail.component';
const routes: Routes = [
    { path: '', component: StatusHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: StatusListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: StatusDetailComponent, canActivate: [AuthGuard]},
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
export class StatusRoutingModule { }