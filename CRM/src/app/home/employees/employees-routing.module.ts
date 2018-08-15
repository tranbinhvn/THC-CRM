import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import {EmployeesHomeComponent} from './components/employees-home.component';
import {EmployeesComponent} from './components/employees-control.component';

const routes: Routes = [
    {
        path: '', component: EmployeesHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: EmployeesComponent, canActivate: [AuthGuard]},
            
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
export class EmployeesRoutingModule { }
