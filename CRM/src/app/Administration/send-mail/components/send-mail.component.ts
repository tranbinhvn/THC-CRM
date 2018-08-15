import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AlertModal } from 'alert-confirm/alert-modal';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
// Service
import { SendMailService } from 'category/send-mail/send-mail.service';
// Model
import { ApiSendMailModel, SendMailCRUDModel, ISendMailCRUDModel } from 'share-models/send-mail.model';
@Component({
  selector: 'playbook',
  templateUrl: './../pages/send-mail.component.html'
})
export class SendMailComponent {
  errorMessage: string;
  notFoundData: string = null;
  message: string;
  emails: Array<SendMailCRUDModel>;
  keywords: string;
  name: string;
  show: number = 0;
  selectEmails: Array<SendMailCRUDModel>;
  constructor(
    public modal: Modal,
    translate: TranslateService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _serviceSendMail: SendMailService,
  ) {
    //translate.use(localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED));
    this.emails = new Array<SendMailCRUDModel>();
  }

  ngOnInit(): void {
  }

  getMail(): void {
    this.keywords = this.name + "/" + this.name;
    this._serviceSendMail.searchMail<ISendMailCRUDModel>(this.keywords).subscribe(response => this.mappingData(response)
      , error => this.errorMessage = <any>error);
  }

  mappingData(data: ResponseModel<ISendMailCRUDModel[]>): void {
    this.notFoundData = "";
    this.emails.length = 0;
    this.show = 0;
    if (data == null || data.result == null || data.result.length == 0) {
      this.notFoundData = ContantValues.NOT_FOUND_DATA_MESSAGE;
      return;
    }

    for (let x of data.result) {
      this.emails.push(new SendMailCRUDModel(x));
    }
    this.show = this.emails.length;
  }
}
