import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CustomersHomeComponent} from './components/customers-home.component';
import {CustomersListComponent} from './components/customers-list.component';
import {CustomersDetailComponent} from './components/customers-detail.component';
const routes: Routes = [
    { path: '', component: CustomersHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CustomersListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: CustomersDetailComponent, canActivate: [AuthGuard]},
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
export class CustomerRoutingModule { }