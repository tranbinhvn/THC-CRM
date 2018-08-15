import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {CountryHomeComponent} from './components/country-home.component';
import {CountryListComponent} from './components/country-list.component';
import {CountryDetailComponent} from './components/country-detail.component';
const routes: Routes = [
    { path: '', component: CountryHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: CountryListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: CountryDetailComponent, canActivate: [AuthGuard]},
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
export class CountryRoutingModule { }