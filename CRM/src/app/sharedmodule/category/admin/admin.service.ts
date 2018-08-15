
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// import './rxjs-extensions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Service } from 'api/service';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
import { ResponseModel } from 'api/response.model';

@Injectable()
export class AdminService {
constructor(private _http: Http
    , private _service: Service) {

}
getOne<V>(id: string): Observable<ResponseModel<V>> {
    return this._service.getOne(id, ApiWsCodeContant.WS_ADMIN)
        .catch(this.handleError);
}

getList<V>() {
    return this._service.getList<V>( ApiWsCodeContant.WS_ADMIN)
    .catch(error => this.handleError(error));
    
}

searchPaging<V>(name: string, page:number, size: number): Observable<ResponseModel<V[]>> {
    return this._service.searchPaging(name,ApiWsCodeContant.WS_ADMIN,page,size).catch(error => this.handleError(error));
}

getListPaging<V>(page: number, size: number): Observable<ResponseModel<V[]>> {
    return this._service.getListPaging(ApiWsCodeContant.WS_ADMIN,page,size).catch(error => this.handleError(error));
}

create<T>(dataRequest: T): Observable<string> {
    return this._service.create(dataRequest, ApiWsCodeContant.WS_ADMIN).catch(error => this.handleError(error));
}

update<T>(dataRequest: T): Observable<string> {
    return this._service.update(dataRequest, ApiWsCodeContant.WS_ADMIN).catch(error => this.handleError(error));
}

delete<T>(id: string): Observable<string> {
    return this._service.delete(id, ApiWsCodeContant.WS_ADMIN).catch(error => this.handleError(error));
}

private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error);
}
}

