import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
@Injectable()
export class ManagerRole implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        let userData = JSON.parse(localStorage.getItem(ContantValues.LOCAL_STORAGE_USER_LOGIN));
        // if (userData.userRole == '1') {
        //     return true;
        // }
        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['']);
        // return false;
        return true;
    }
}