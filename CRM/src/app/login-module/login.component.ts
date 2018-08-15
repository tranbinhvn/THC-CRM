import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoginModel } from 'login-model/user-login.model';
import { AccountLoginModel } from 'login-model/account.login.model';
import { AuthenticationService } from './authentication.Service';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    private user: UserLoginModel = new UserLoginModel();
    private account: AccountLoginModel = new AccountLoginModel();
    private errorMsg = '';
    returnUrl: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authService.logout();
        //return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
    }

    login() {
        this.authService.logout();
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
        this.authService.login<AccountLoginModel, UserLoginModel>(this.account).subscribe(
            response => this.mappingData(response),
            error => {this.errorMsg = "Đăng nhập thất bại, có lỗi xẩy ra."},
        );
    }
    
    mappingData(data: ResponseModel<UserLoginModel>): void {
        this.errorMsg = "";
        if (data == null || data.errorCode != "0") {
            this.errorMsg = "Đăng nhập thất bại.Tên đăng nhập hoặc mật khẩu không đúng";
            return;
        }
        localStorage.setItem(ContantValues.LOCAL_STORAGE_USER_LOGIN, JSON.stringify(data.result));
        this._router.navigate(['/']);
    }

}
