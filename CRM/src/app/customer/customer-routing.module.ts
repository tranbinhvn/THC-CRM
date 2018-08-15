import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { Customer } from './customer';
const routes: Routes = [
    { 
        path: '', component: Customer, canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: 'app/customer/home-customer/home-customer.module#HomeCustomerModule' },
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
export class CustomerRoutingModule { }
