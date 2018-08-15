import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {ContractHomeComponent} from './components/contract-home.component';
import {ContractListComponent} from './components/contract-list.component';
import {ContractDetailComponent} from './components/contract-detail.component';
const routes: Routes = [
    { path: '', component: ContractHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: ContractListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: ContractDetailComponent, canActivate: [AuthGuard]},
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
export class ContractRoutingModule { }