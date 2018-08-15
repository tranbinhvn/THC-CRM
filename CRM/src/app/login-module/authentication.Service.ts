import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ApiWsCodeContant } from 'sharedmodule/global-contants/api-wscode.contants';
import { Service } from 'api/service';
@Injectable()
export class AuthenticationService {

    constructor(private _router: Router, private _service: Service) {
    }

    // login1(user: UserLoginModel) {

    //     if (user.username == "thcdev" && user.password == "123456") {
    //         user.userRole = '1';
    //         localStorage.setItem(ContantValues.LOCAL_STORAGE_USER_LOGIN, JSON.stringify(user));
    //         return true;
    //     }
    //     if (user.username == "kiennt@viettel.com.vn" && user.password == "006097") {
    //         user.userRole = '1';
    //         localStorage.setItem(ContantValues.LOCAL_STORAGE_USER_LOGIN, JSON.stringify(user));
    //         return true;
    //     }
    //     if (user.username == "doanhdv2@viettel.com.vn" && user.password == "113789") {
    //         user.userRole = '2';
    //         localStorage.setItem(ContantValues.LOCAL_STORAGE_USER_LOGIN, JSON.stringify(user));
    //         return true;
    //     }
    //     if (user.username == "nhungttt3@viettel.com.vn" && user.password == "128674") {
    //         user.userRole = '2';
    //         localStorage.setItem(ContantValues.LOCAL_STORAGE_USER_LOGIN, JSON.stringify(user));
    //         return true;
    //     }
    //     return false;
    // }

    login<T, V>(dataRequest: T) {
        return this._service.login(dataRequest, ApiWsCodeContant.WS_LOGIN).catch(error => this.handleError(error));
    }

    logout() {
        localStorage.removeItem(ContantValues.LOCAL_STORAGE_USER_LOGIN);
        this._router.navigate(['/login']);
    }

    checkCredentials() {
        if (localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN) === null) {
            this._router.navigate(['/login']);
        }
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}