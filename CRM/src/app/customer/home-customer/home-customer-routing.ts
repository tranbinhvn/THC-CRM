import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {HomeCustomerHomeComponent} from './components/home-customer-home.component';
import {HomeCustomerComponent} from './components/home-customer.component';
import {DetailCustomerComponent} from './components/detail-customer.component';
const routes: Routes = [
    { path: '', component: HomeCustomerHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: HomeCustomerComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: DetailCustomerComponent, canActivate: [AuthGuard]},
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
export class HomeCustomerRoutingModule { }