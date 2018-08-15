import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AuthenticationService } from './login-module/authentication.Service';
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
@Component({
  selector: 'thc-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './../dist/scss/base.css'
    , './../dist/scss/form.css'
    , './../dist/scss/button.css'
    , './../dist/scss/elements.css'
    , './../dist/scss/style.css'
    , './../dist/scss/managementUser.css'
    , './../dist/scss/helper.css'
    , './../dist/scss/app.component.css'
    , "node_modules/ng2-tree/styles.css"
    , "node_modules/angular-vertical-timeline/vertical-timeline.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    private authService: AuthenticationService,
    private translate: TranslateService,

    ) {
    this.translate.setDefaultLang(ContantValues.LOCATION_LANGUAGE_DEFAULT);
    let location: string = localStorage.getItem(ContantValues.LOCATION_LANGUAGE_STORED);
    this.translate.use(location || ContantValues.LOCATION_LANGUAGE_DEFAULT);
  }

  switchLanguage(language: string){
    this.translate.use(language || ContantValues.LOCATION_LANGUAGE_DEFAULT);
    localStorage.setItem(ContantValues.LOCATION_LANGUAGE_STORED, language || ContantValues.LOCATION_LANGUAGE_DEFAULT);
  }

  ngOnInit() {
    this.authService.checkCredentials();
  }
  
  logout() {
    this.authService.logout();
  }
}
