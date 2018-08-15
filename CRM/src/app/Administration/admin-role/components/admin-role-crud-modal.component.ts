import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
// Service
import { AdminService } from 'category/admin/admin.service';
import { RoleService } from 'category/role/role.service';
// Model
import {RoleModel,IRoleModel} from 'share-models/role.model';
import {AdminModel,IAdminModel } from 'share-models/admin.model';
import {AdminRoleCRUDModel} from 'share-models/admin-role.model';

export class AdminRoleModalContext extends BSModalContext {
    dialogClass: string;
    dataAdminRole: AdminRoleCRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'admin-role-modal',
    styles: [],
    templateUrl: "./../pages/admin-role-crud-modal.component.html"
})
export class AdminRoleModal implements OnInit, CloseGuard, ModalComponent<AdminRoleModalContext> {
    pageStatus: string = "init";
    submitted: boolean = false;
    notFoundData: string = null;
    context: AdminRoleModalContext;
    adminRole: AdminRoleCRUDModel;
    admins: Array<AdminModel>;
    roles: Array<RoleModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public dialog: DialogRef<AdminRoleModalContext>,
        public _serviceAdmin: AdminService,
        public _serviceRole: RoleService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.adminRole = this.context.dataAdminRole;
        this.admins = new Array<AdminModel>();
        this.roles = new Array<RoleModel>();
    }

    ngOnInit(): void {
        this.getListAdmin();
        this.getListRole();
    }

    // Admin
    getListAdmin(){
        this._serviceAdmin.getList<AdminModel>().subscribe(response => this.mappingAdmin(response));
    }

    mappingAdmin(data:ResponseModel<IAdminModel[]>){
        this.notFoundData = "";
        this.admins.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.admins.push(new AdminModel(x));
        }
    }

    // Role
    getListRole(){
        this._serviceRole.getList<IRoleModel>().subscribe(response => this.mappingPosition(response));
    }

    mappingPosition(data:ResponseModel<IRoleModel[]>){
        this.notFoundData = "";
        this.roles.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.roles.push(new RoleModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(adminRoleForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!adminRoleForm.valid) {
            return;
        }
        this.dialog.close(this.adminRole);
    }

    // This function will be called when you click outside of modal or click the x button.
    dismiss() {
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return false;
    }


    isExpanded: boolean = false;
    expand(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded == true)
            this.context.dialogClass = this.expandCssClass;
        else
            this.context.dialogClass = this.defaultCssClass;
    }
}
