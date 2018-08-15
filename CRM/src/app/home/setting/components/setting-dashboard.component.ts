import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
// Service
import { AdminService } from 'app/sharedmodule/category/admin/admin.service';
// Model
import {AdminCRUDModel,IAdminCRUDModel} from 'share-models/admin.model';
@Component({
    templateUrl: './../pages/setting-dashboard.component.html',
})
export class SettingDashboardComponent{
}
