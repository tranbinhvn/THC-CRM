
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import './rxjs-extensions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

import { ResponseModel } from './response.model';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Injectable()
export class Service implements OnInit {

    // private _url = 'http://192.168.100.6:8080/thc-csm/';
    private _url = 'http://192.168.100.100:8080/thc-csm/';
    // private _url = 'http://64.140.157.249:8080/thc-csm/';
    // private _url = 'http://localhost:8082/';
    errorMessage: string;
    _sessionId: string = "";
    _token: string = "";
    _header_token: string = "Authorization"
    //_headers: Headers;
    constructor(private _http: Http) {
        // this._headers = new Headers();
        // this._headers.append('Content-Type', 'application/json; charset=UTF-8');
       // this._headers.append('Access-Control-Allow-Origin', '*');
        //this._headers.append('Access-Control-Allow-Credentials', 'true');

    }

    ngOnInit(): void {
    }

    createOption(): RequestOptions {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if (userLogin == null || !userLogin.tokenAuth) {
            return;
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append(this._header_token, userLogin.tokenAuth);
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    //update code webservice new
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleResponseGetData<V>(res: Response): ResponseModel<V[]> {
        let resBody: ResponseModel<V[]> = res.json();
        return resBody;
    }

    private handleResponseGetOne<V>(res: Response): ResponseModel<V> {
        let resBody: ResponseModel<V> = res.json();
        return resBody;
    }

    private handleResponseCrud(res: Response): string {
        let resBody: string = res.text();
        return resBody;
    }

    private handleResponseLogin<V>(res: Response): ResponseModel<V> {
        let resBody: ResponseModel<V> = res.json();
        return resBody;
    }
    // use for get detail
    searchMail<V>(keywords: string, _wsCode: string): Observable<ResponseModel<V[]>> {
        let url = this._url + _wsCode + "/" + keywords;
        return this._http.get(url, this.createOption()).map(this.handleResponseGetOne.bind(this))
            .catch(this.handleError);
    }
    
    getOne<V>(id: string, _wsCode: string): Observable<ResponseModel<V>> {
        let url = this._url + _wsCode + "/" + id;
        return this._http.get(url, this.createOption()).map(this.handleResponseGetOne.bind(this))
            .catch(this.handleError);
    }
    searchPaging<V>(name: string, _wsCode: string, page?: number, size?: number): Observable<ResponseModel<V[]>> {
        let url = this._url + _wsCode + "/" + name + "/" + page + "/" + size;
        return this._http.get(url, this.createOption()).map(this.handleResponseGetData.bind(this))
            .catch(this.handleError);
    }
    getList<V>(_wsCode: string): Observable<ResponseModel<V[]>> {
        let url = this._url + _wsCode;
        return this._http.get(url, this.createOption()).map(this.handleResponseGetData.bind(this))
            .catch(this.handleError);
    }

    getListPaging<V>(_wsCode: string, page?: number, size?: number): Observable<ResponseModel<V[]>> {
        let url = this._url + _wsCode + "/" + page + "/" + size;
        return this._http.get(url, this.createOption()).map(this.handleResponseGetData.bind(this))
            .catch(this.handleError);
    }

    create<T>(dataRequest: T, _wsCode: string): Observable<string> {
        let url = this._url + _wsCode
        return this._http.post(url, JSON.stringify(dataRequest), this.createOption()).map(this.handleResponseCrud.bind(this))
            .catch(this.handleError);
    }

    update<T>(dataRequest: T, _wsCode: string): Observable<string> {
        let url = this._url + _wsCode
        return this._http.put(url, JSON.stringify(dataRequest), this.createOption()).map(this.handleResponseCrud.bind(this))
            .catch(this.handleError);
    }

    lockItem(id: string, _wsCode: string): Observable<string> {
        let url = this._url + _wsCode + "/" + id
        return this._http.put(url, this.createOption()).map(this.handleResponseCrud.bind(this))
            .catch(this.handleError);
    }
    delete(id: string, _wsCode: string): Observable<string> {
        let url = this._url + _wsCode + "/" + id;
        return this._http.delete(url, this.createOption()).map(this.handleResponseCrud.bind(this))
            .catch(this.handleError);
    }

    login<T, V>(dataRequest: T, _wsCode: string): Observable<ResponseModel<V>> {
        let url = this._url + _wsCode
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
        let body = this.serializeObj(dataRequest);
        return this._http.post(url, body, options).map(this.handleResponseLogin.bind(this))
            .catch(this.handleError);
    }

    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    }
}
