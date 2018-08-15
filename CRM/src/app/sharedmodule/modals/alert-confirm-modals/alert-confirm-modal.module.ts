import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModal } from './alert-modal';
import { ConfirmModal } from './confirm-modal';
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
@NgModule({
    imports: [
        CommonModule,
        TranslateI18nModule
    ],
    declarations: [
        AlertModal,
        ConfirmModal
    ],
    providers: [],
    entryComponents: [AlertModal, ConfirmModal]
})
export class AlertConfirmModalModule { }