import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthenticationService } from './login-module/authentication.Service';
import { ɵROUTER_PROVIDERS} from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Service } from 'api/service';
import { AuthGuard } from './login-module/auth.guard';
import { LoginComponent } from './login-module/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateI18nModule } from 'sharedmodule/i18n/translate.module';
import { CustomPreloading } from 'app/app.custompreloading';
// import { ChartsModule } from 'ng2-charts';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//print
import { PdfmakeModule} from 'pdfmake-apply/pdfmake.module';
import { MHTC1089Component} from 'pdfmake-apply/components/1089-mhtc.component';
import { TTQHTKComponent} from 'pdfmake-apply/components/tt-qhtk.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    //new design
    TranslateI18nModule,
    PdfmakeModule,
    //router config
    AppRoutingModule,
    // ChartsModule,
    // NgbModule.forRoot(),
    BootstrapModalModule,
  ],
  declarations: [AppComponent, LoginComponent, MHTC1089Component, TTQHTKComponent],
  providers: [ɵROUTER_PROVIDERS,AuthenticationService, AuthGuard, CustomPreloading, Service,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})

export class AppModule {
  
}
