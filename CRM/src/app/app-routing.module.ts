
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-module/login.component';
import { AuthGuard } from './login-module/auth.guard';
import { CustomPreloading } from 'app/app.custompreloading';
const routes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data: { isPreload: true } },

    { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule', canActivate: [AuthGuard] },
    { path: 'timeline', loadChildren: 'app/timeline-module/timeline.module#TimelineModule', canActivate: [AuthGuard] },
    { path: 'administration', loadChildren: 'app/Administration/administration.module#AdministrationModule', canActivate: [AuthGuard] },
    { path: 'setting', loadChildren: 'app/setting-home/setting-home.module#SettingHomeModule', canActivate: [AuthGuard] },
    { path: 'control-board', loadChildren: 'app/control-board/control-board.module#ControlBoardModule', canActivate: [AuthGuard] },
    { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloading })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
