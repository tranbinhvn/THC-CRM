import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CommentHomeComponent} from './components/comment-home.component';
import {CommentListComponent} from './components/comment-list.component';
import {CommentDetailComponent} from './components/comment-detail.component';
const routes: Routes = [
    { path: '', component: CommentHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CommentListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: CommentDetailComponent, canActivate: [AuthGuard]},
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
export class CommentRoutingModule { }