import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {MarketLevelHomeComponent} from './components/marketlevel-home.component';
import {MarketLevelListComponent} from './components/marketlevel-list.component';
import {MarketLevelDetailComponent} from './components/marketlevel-detail.component';
const routes: Routes = [
    { path: '', component: MarketLevelHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: MarketLevelListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: MarketLevelDetailComponent, canActivate: [AuthGuard]},
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
export class MarketLevelRoutingModule { }