import { ContantValues } from 'sharedmodule/global-contants/value.contants';
// List
export class CTACommentModel {
    id: string = "";
    cmContent: string = "";
    active: number = 0;
    activeName: string = "";
    cTAName: string = "";
    constructor (data: ICTACommentModel) {
        if(!data){return}
        this.id = data.id || "";
        this.cmContent = data.cmContent || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
        this.cTAName = data.cTAName || "";
    }
}

export interface ICTACommentModel {
    id: string;
    cmContent: string;
    active: number;
    cTAName: string;
}

// Create Update Detail
export class CTACommentCRUDModel {
    id: string = "";
    cmContent: string = "";
    active: number = 0;
    activeName: string = "";
    cTAId: number = 0;
    cTAName: string = "";
    constructor (data: ICTACommentCRUDModel) {
        if(!data){return}
        this.id = data.id || "";
        this.cmContent = data.cmContent || "";
        this.active = data.active;
        this.activeName = ContantValues.ACTIVE_LOCK_ITEM.find(s=>{return s.key == this.active}).value || "Không hoạt động";
        this.cTAId = data.cTAId || 0;
        this.cTAName = data.cTAName || "";
    }
}

export interface ICTACommentCRUDModel {
    id: string;
    cmContent: string;
    active: number;
    cTAId: number;
    cTAName: string;
}

// Api
export class ApiCTACommentModel {
    id: string;
    cmContent: string;
    active: number;
    cTAId: number;
    createdBy: number;
    constructor(data: CTACommentCRUDModel,createdBy: number){
        this.id = data.id;
        this.cmContent = data.cmContent;
        this.active = data.active;
        this.cTAId = data.cTAId;
        this.createdBy = createdBy;
    }
}

export class searchCTAComment {
    id: string;
    name: string;
    page: number;
    size: number;
}