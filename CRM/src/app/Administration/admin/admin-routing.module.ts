import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { AdminHomeComponent } from './components/admin-home.component';
import { AdminListComponent } from './components/admin-list.component';
import { AdminDetailComponent } from './components/admin-detail.component';

const routes: Routes = [
    {
        path: '', component: AdminHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: AdminListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: AdminDetailComponent, canActivate: [AuthGuard]},
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
export class AdminRoutingModule { }
