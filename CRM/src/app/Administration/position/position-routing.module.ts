import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {PositionHomeComponent} from './components/position-home.component';
import {PositionListComponent} from './components/position-list.component';
import {PositionDetailComponent} from './components/position-detail.component';
const routes: Routes = [
    { path: '', component: PositionHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: PositionListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: PositionDetailComponent, canActivate: [AuthGuard]},
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
export class PositionRoutingModule { }