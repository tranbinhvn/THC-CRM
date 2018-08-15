import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/login-module/auth.guard';
import { ManagerRole } from 'app/login-module/manager-role';
import { CustomPreloading } from 'app/app.custompreloading';
import { AdministraionComponent } from './administration.component';
const routes: Routes = [
    {
        path: '', component: AdministraionComponent, canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: 'app/Administration/admin/admin.module#AdminModule' },
            { path: 'status', loadChildren: 'app/Administration/status/status.module#StatusModule' },
            { path: 'comment', loadChildren: 'app/Administration/comment/comment.module#CommentModule' },
            { path: 'customers', loadChildren: 'app/Administration/customers/customers.module#CustomersModule' },
            { path: 'position', loadChildren: 'app/Administration/position/position.module#PositionModule' },
            { path: 'tickettype', loadChildren: 'app/Administration/ticket-type/tickettype.module#TicketTypeModule' },
            { path: 'adminmarketlevel', loadChildren: 'app/Administration/admin-market-level/admin-market-level.module#AdminMarketLevelModule' },
            { path: 'adminposition', loadChildren: 'app/Administration/admin-position/admin-position.module#AdminPositionModule' },
            { path: 'adminrole', loadChildren: 'app/Administration/admin-role/admin-role.module#AdminRoleModule' },
            { path: 'customerasign', loadChildren: 'app/Administration/customer-assignment/customer-assignment.module#CustomerAssignmentModule' },
            { path: 'product', loadChildren: 'app/Administration/product/product.module#ProductModule' },
            { path: 'contract', loadChildren: 'app/Administration/contract/contract.module#ContractModule' },
            { path: 'ticket', loadChildren: 'app/Administration/ticket/ticket.module#TicketModule' },
            { path: 'adminlocation', loadChildren: 'app/Administration/admin-location/admin-location.module#AdminLocationModule' },
            { path: 'region', loadChildren: 'app/Administration/region/region.module#RegionModule' },
            { path: 'role', loadChildren: 'app/Administration/role/role.module#RoleModule' },
            { path: 'country', loadChildren: 'app/Administration/country/country.module#CountryModule' },
            { path: 'marketlevel', loadChildren: 'app/Administration/market-level/marketlevel.module#MarketLevelModule' },
            { path: 'contact', loadChildren: 'app/Administration/contact/contact.module#ContactModule' },
            { path: 'cta-comment', loadChildren: 'app/Administration/cta-comment/cta-comment.module#CTACommentModule' },
            { path: 'cta-status', loadChildren: 'app/Administration/cta-status/cta-status.module#CTAStatusModule' },
            { path: 'cta-type', loadChildren: 'app/Administration/cta-type/cta-type.module#CTATypeModule' },
            { path: 'cta-reason', loadChildren: 'app/Administration/cta-reason/cta-reason.module#CTAReasonModule' },
            { path: 'cta-priority', loadChildren: 'app/Administration/cta-priority/cta-priority.module#CTAPriorityModule' },
            { path: 'send-mail', loadChildren: 'app/Administration/send-mail/send-mail.module#SendMailModule' },
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
export class AdministrationRoutingModule { }
