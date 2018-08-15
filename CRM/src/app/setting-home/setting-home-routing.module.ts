import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { SettingHome } from './setting-home';
const routes: Routes = [
    { 
        path: '', component: SettingHome, canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: 'app/setting-home/dashboard/dashboard-setting.module#DashboardSettingModule' },
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
export class SettingHomeRoutingModule { }
