import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {AdminMarketLevelHomeComponent} from './components/admin-market-level-home.component';
import {AdminMarketLevelListComponent} from './components/admin-market-level-list.component';
import {AdminMarketLevelDetailComponent} from './components/admin-market-level-detail.component';
const routes: Routes = [
    { path: '', component: AdminMarketLevelHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: AdminMarketLevelListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: AdminMarketLevelDetailComponent, canActivate: [AuthGuard]},
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
export class AdminMarketLevelRoutingModule { }