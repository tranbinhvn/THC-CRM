import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { CTACRUDModel, ICTACRUDModel, CTAModel, ICTAModel } from './cta.model';
// List
export class CustomerCTAModel {
    id: string = "";
    name: string = "";
    displayName: string = "";
    ctaDueDateList: Array<CTACRUDModel> = new Array<CTACRUDModel>();
    totalDueDate: number;
    ctaEffectList: Array<CTACRUDModel> = new Array<CTACRUDModel>();
    totalEffect: number;
    constructor(data: ICustomerCTAModel) {
        if (!data) { return }
        this.id = data.id || "";
        this.name = data.name || "";
        this.displayName = data.displayName || "";
        if (data.ctaDueDateList != null && data.ctaDueDateList.length > 0) {
            this.ctaDueDateList = data.ctaDueDateList.map(m => new CTACRUDModel(m)) || [];
            this.totalDueDate = data.ctaDueDateList.length;
        }
        if (data.ctaEffectList) {
            this.ctaEffectList = data.ctaEffectList.map(m => new CTACRUDModel(m)) || [];
            this.totalEffect = data.ctaEffectList.length;
        }
    }
}

export interface ICustomerCTAModel {
    id: string;
    name: string;
    displayName: string;
    ctaDueDateList: Array<ICTACRUDModel>;
    ctaEffectList: Array<ICTACRUDModel>;
}

