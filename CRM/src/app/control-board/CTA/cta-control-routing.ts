import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {ListControlHomeComponent} from './components/cta-control-home.component';
import {ListComponent} from './components/cta-control.component';
import {PlaybookComponent} from './components/cta-playbook.component';
const routes: Routes = [
    { path: '', component: ListControlHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: ListComponent, canActivate: [AuthGuard]},
            {path: 'playbook', component: PlaybookComponent, canActivate: [AuthGuard]},
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
export class ListControlRoutingModule { }