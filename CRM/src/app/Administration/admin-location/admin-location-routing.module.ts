import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {AdminLocationHomeComponent} from './components/admin-location-home.component';
import {AdminLocationListComponent} from './components/admin-location-list.component';
import {AdminLocationDetailComponent} from './components/admin-location-detail.component';
const routes: Routes = [
    { path: '', component: AdminLocationHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: AdminLocationListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: AdminLocationDetailComponent, canActivate: [AuthGuard]},
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
export class AdminLocationRoutingModule { }