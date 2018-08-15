import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { HomeComponent } from './home.component';
import { HomeParentComponent } from './home-parent.component';
const routes: Routes = [
    {
        path: '', component: HomeParentComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: HomeComponent, canActivate: [AuthGuard]},
            { path: 'setting', loadChildren: 'app/home/setting/setting.module#SettingModule' },
            { path: 'employees', loadChildren: 'app/home/employees/employees.module#EmployeesModule' },             
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
export class HomeRoutingModule { }
