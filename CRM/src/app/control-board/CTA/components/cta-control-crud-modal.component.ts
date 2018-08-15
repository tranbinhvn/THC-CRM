import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { CTACRUDModel } from 'share-models/cta.model';
import { AlertModal } from 'alert-confirm/alert-modal';
// Service
import { CTACommentService } from 'category/cta/cta-comment.service';
import { CTAPriorityService } from 'category/cta/cta-priority.service';
import { CTAReasonService } from 'category/cta/cta-reason.service';
import { CTAStatusService } from 'category/cta/cta-status.service';
import { CTATypeService } from 'category/cta/cta-type.service';
import { CustomerService } from 'category/customers/customer.service';
import { AdminService } from 'category/admin/admin.service';
// Model
import { CTACommentModel, ICTACommentModel } from 'share-models/cta-comment.model';
import { CTAStatusModel, ICTAStatusModel } from 'share-models/cta-status.model';
import { CTAPriorityModel, ICTAPriorityModel } from 'share-models/cta-priority.model';
import { CTAReasonModel, ICTAReasonModel } from 'share-models/cta-reason.model';
import { CTATypeModel, ICTATypeModel } from 'share-models/cta-type.model';
import { CustomerModel, ICustomerModel } from 'share-models/customer.model';
import { AdminModel, IAdminModel } from 'share-models/admin.model';
export class CTAModalContext extends BSModalContext {
    dialogClass: string;
    dataCTA: CTACRUDModel;
    dataMessage: string;
}
@Component({
    selector: 'cta-modal',
    styles: [],
    templateUrl: "./../pages/cta-control-crud-modal.component.html"
})
export class CTAModal implements OnInit, CloseGuard, ModalComponent<CTAModalContext> {
    pageStatus: string = "init";
    notFoundData: string = null;
    submitted: boolean = false;
    context: CTAModalContext;
    cta: CTACRUDModel;
    ctaCom: Array<CTACommentModel>;
    ctaSta: Array<CTAStatusModel>;
    ctaPri: Array<CTAPriorityModel>;
    ctaTyp: Array<CTATypeModel>;
    ctaRea: Array<CTAReasonModel>;
    customers: Array<CustomerModel>;
    admins: Array<AdminModel>;
    defaultCssClass: string = "modal-dialog thc-modal-dialog";
    expandCssClass: string = "modal-dialog thc-modal-dialog fullscreen";
    constructor(
        public modal:Modal,
        public dialog: DialogRef<CTAModalContext>,
        translate: TranslateService,
        public _route: ActivatedRoute,
        public _router: Router,
        public _serviceCTACom: CTACommentService,
        public _serviceCTASta: CTAStatusService,
        public _serviceCTAPri: CTAPriorityService,
        public _serviceCTATyp: CTATypeService,
        public _serviceCTARea: CTAReasonService,
        public _serviceCustomer: CustomerService,
        public _serviceAdmin: AdminService,
    ) {
        this.context = dialog.context;
        this.context.dialogClass = this.defaultCssClass;
        this.cta = this.context.dataCTA;
        this.ctaCom = new Array<CTACommentModel>();
        this.ctaSta = new Array<CTAStatusModel>();
        this.ctaPri = new Array<CTAPriorityModel>();
        this.ctaTyp = new Array<CTATypeModel>();
        this.ctaRea = new Array<CTAReasonModel>();
        this.customers = new Array<CustomerModel>();
        this.admins = new Array<AdminModel>();
    }

    ngOnInit(): void {
        this.getListCTACom();
        this.getListCTASta();
        this.getListCTAPri();
        this.getListCTATyp();
        this.getListCTARea();
        this.getListCustomer();
        this.getListAdmin();
    }

    // CTAComment
    getListCTACom() {
        this._serviceCTACom.getList<ICTACommentModel>().subscribe(response => this.mappingCTACom(response));
    }

    mappingCTACom(data: ResponseModel<ICTACommentModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.ctaCom.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctaCom.push(new CTACommentModel(x));
        }
    }

    // CTAStatus
    getListCTASta() {
        this._serviceCTASta.getList<ICTAStatusModel>().subscribe(response => this.mappingCTASta(response));
    }

    mappingCTASta(data: ResponseModel<ICTAStatusModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.ctaSta.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctaSta.push(new CTAStatusModel(x));
        }
    }

    // CTAPriority
    getListCTAPri() {
        this._serviceCTAPri.getList<ICTAPriorityModel>().subscribe(response => this.mappingCTAPri(response));
    }

    mappingCTAPri(data: ResponseModel<ICTAPriorityModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.ctaPri.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctaPri.push(new CTAPriorityModel(x));
        }
    }

    // CTAReason
    getListCTARea() {
        this._serviceCTARea.getList<ICTAReasonModel>().subscribe(response => this.mappingCTARea(response));
    }

    mappingCTARea(data: ResponseModel<ICTAReasonModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.ctaRea.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctaRea.push(new CTAReasonModel(x));
        }
    }

    // CTAType
    getListCTATyp() {
        this._serviceCTATyp.getList<ICTATypeModel>().subscribe(response => this.mappingCTATyp(response));
    }

    mappingCTATyp(data: ResponseModel<ICTATypeModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.ctaTyp.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.ctaTyp.push(new CTATypeModel(x));
        }
    }

    // Customers
    getListCustomer() {
        this._serviceCustomer.getList<ICustomerModel>().subscribe(response => this.mappingCustomer(response));
    }

    mappingCustomer(data: ResponseModel<ICustomerModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.customers.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }

        for (let x of data.result) {
            this.customers.push(new CustomerModel(x));
        }
    }

    // Admins
    getListAdmin() {
        this._serviceAdmin.getList<IAdminModel>().subscribe(response => this.mappingAdmin(response));
    }
    
    mappingAdmin(data: ResponseModel<IAdminModel[]>) {
        this.notFoundData = "";
        if(data.errorCode == ContantValues.LOGIN_EXPIRED){
            this.alert("Login hết hạn");
            this._router.navigate(["/login"]);
        }
        this.admins.length = 0;
        if (data == null || data.result == null || data.result.length == 0) {
            this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
            return;
        }
    
        for (let x of data.result) {
            this.admins.push(new AdminModel(x));
        }
    }

    // This function will be called when you close the modal and return the value.
    close(ctaForm: any) {
        this.pageStatus = "submit";
        this.submitted = true;
        if (!ctaForm.valid) {
            return;
        }
        this.dialog.close(this.cta);
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

    alert(keyLang: string, title?: string) {
        let message = keyLang;
        // this.translate.get(keyLang).subscribe((result: string) => {
        //   message = result;
        // });
        this.modal.open(AlertModal, overlayConfigFactory({ title: "", messge: message }, BSModalContext));
    }
}
