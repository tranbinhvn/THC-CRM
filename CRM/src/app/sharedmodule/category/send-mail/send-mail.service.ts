
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
export class SendMailService {
constructor(private _http: Http
    , private _service: Service) {

}

searchMail<V>(keywords: string): Observable<ResponseModel<V[]>> {
    return this._service.searchMail<V>(keywords,ApiWsCodeContant.WS_SENDMAIL)
        .catch(error => this.handleError(error));
}

getOne<V>(id: string): Observable<ResponseModel<V>> {
    return this._service.getOne(id, ApiWsCodeContant.WS_SENDMAIL)
        .catch(this.handleError);
}

getList<V>() {
    return this._service.getList<V>( ApiWsCodeContant.WS_SENDMAIL)
    .catch(error => this.handleError(error));
    
}

searchPaging<V>(name: string, page:number, size: number): Observable<ResponseModel<V[]>> {
    return this._service.searchPaging(name,ApiWsCodeContant.WS_SENDMAIL,page,size).catch(error => this.handleError(error));
}

create<T>(dataRequest: T): Observable<string> {
    return this._service.create(dataRequest, ApiWsCodeContant.WS_SENDMAIL).catch(error => this.handleError(error));
}

update<T>(dataRequest: T): Observable<string> {
    return this._service.update(dataRequest, ApiWsCodeContant.WS_SENDMAIL).catch(error => this.handleError(error));
}

delete<T>(id: string): Observable<string> {
    return this._service.update(id, ApiWsCodeContant.WS_SENDMAIL).catch(error => this.handleError(error));
}

private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error);
}

}

