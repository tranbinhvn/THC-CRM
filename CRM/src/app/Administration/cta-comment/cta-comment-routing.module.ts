import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CTACommentHomeComponent} from './components/cta-comment-home.component';
import {CTACommentListComponent} from './components/cta-comment-list.component';
const routes: Routes = [
    { path: '', component: CTACommentHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CTACommentListComponent, canActivate: [AuthGuard]},
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
export class CTACommentRoutingModule { }