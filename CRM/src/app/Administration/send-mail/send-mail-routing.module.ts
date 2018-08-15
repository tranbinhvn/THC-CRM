import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {SendMailHomeComponent} from './components/send-mail-home.component';
import {SendMailComponent} from './components/send-mail.component';
const routes: Routes = [
    { path: '', component: SendMailHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: SendMailComponent, canActivate: [AuthGuard]},
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
export class SendMailRoutingModule { }