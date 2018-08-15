import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: `<div class="container-fluid padd-none">
    <ul class="ul-bar" style="background-color:rgb(255, 255, 255);height: 49px;">
        <div class="menu-item-icon admin-cog pull-left" style="padding:14px;color:#fff">
            Cong Nguyen Thanh
        </div>
        <div class="tritangle"></div>
        <li class="menu-item-icon main-menu-item">
            <div class="pull-left shared-view">
                <a href="#">Profile</a>
            </div>
        </li>
        <li class="menu-item-icon main-menu-item">
            <div class="pull-left shared-view">
                <a href="#">Dashboard</a>
            </div>
        </li>
        <li class="menu-item-icon main-menu-item">
            <div class="pull-left shared-view">
                <a href="#">Notification</a>
            </div>
        </li>
    </ul>
    <router-outlet></router-outlet>
    </div>`
})
export class SettingHome {
}