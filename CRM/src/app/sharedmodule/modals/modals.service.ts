import { Injectable } from '@angular/core';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
import { Observable } from 'rxjs/Observable';
import { ResponseModel } from 'api/response.model';
import { Service } from 'api/service';
// import './rxjs-extensions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ModalsService {
    constructor(private _service: Service) { }

}