import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import {ProductHomeComponent} from './components/product-home.component';
import {ProductListComponent} from './components/product-list.component';
import {ProductDetailComponent} from './components/product-detail.component';
const routes: Routes = [
    { path: '', component: ProductHomeComponent, canActivate: [AuthGuard],
        children: [
            {path: '', component: ProductListComponent, canActivate: [AuthGuard]},
            {path: 'detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
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
export class ProductRoutingModule { }