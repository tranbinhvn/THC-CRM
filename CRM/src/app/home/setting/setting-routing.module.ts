import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import {SettingHomeComponent} from './components/setting-home.component';
import {SettingDashboardComponent} from './components/setting-dashboard.component';

const routes: Routes = [
    {
        path: '', component: SettingHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: SettingDashboardComponent, canActivate: [AuthGuard]},
            
        ],
    },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class SettingRoutingModule { }
