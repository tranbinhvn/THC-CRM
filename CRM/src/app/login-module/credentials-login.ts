import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { UserLoginModel } from 'sharedmodule/models/login-model/user-login.model';
@Injectable()
export class CredentialsLogin {

    constructor(private _router: Router) {
    }

    getCredentials() {
        let userLogin: UserLoginModel = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        if ( userLogin === null) {
            this._router.navigate(['/login']);
            return;
        }
        return userLogin.id;
    }
}