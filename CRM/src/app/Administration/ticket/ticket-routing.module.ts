import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {TicketHomeComponent} from './components/ticket-home.component';
import {TicketListComponent} from './components/ticket-list.component';
import {TicketDetailComponent} from './components/ticket-detail.component';
const routes: Routes = [
    { path: '', component: TicketHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: TicketListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: TicketDetailComponent, canActivate: [AuthGuard]},
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
export class TicketRoutingModule { }