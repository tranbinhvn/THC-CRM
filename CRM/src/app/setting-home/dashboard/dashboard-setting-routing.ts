import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {DashSettingHomeComponent} from './components/dashboard-setting-home.component';
import {DashboardSettingComponent} from './components/dashboard-setting.component';
import {EditSettingComponent} from './components/edit-setting.component';
import {NotificationSettingComponent} from './components/notification-setting.component';
import {AddNewSettingComponent} from './components/add-new.component';
const routes: Routes = [
    { path: '', component: DashSettingHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: DashboardSettingComponent, canActivate: [AuthGuard]},
            {path: 'edit', component: EditSettingComponent, canActivate: [AuthGuard]},
            {path: 'notification', component: NotificationSettingComponent, canActivate: [AuthGuard]},
            {path: 'add', component: AddNewSettingComponent, canActivate: [AuthGuard]},
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
export class DashboardSettingRoutingModule { }