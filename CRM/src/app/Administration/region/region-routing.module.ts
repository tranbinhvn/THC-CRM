import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {RegionHomeComponent} from './components/region-home.component';
import {RegionListComponent} from './components/region-list.component';
import {RegionDetailComponent} from './components/region-detail.component';
const routes: Routes = [
    { path: '', component: RegionHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: RegionListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: RegionDetailComponent, canActivate: [AuthGuard]},
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
export class RegionRoutingModule { }