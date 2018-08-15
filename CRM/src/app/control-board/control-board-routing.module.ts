import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { ControlBoard } from './control-board';
const routes: Routes = [
    { 
        path: '', component: ControlBoard, canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: 'app/control-board/CTA/cta-control.module#CTAControlModule' },
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
export class ControlBoardRoutingModule { }
