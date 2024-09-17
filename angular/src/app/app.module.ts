import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
//import { ConnectionComponent } from './pages/connection/connection.component';

registerLocaleData(zh);
/** 配置 ng-zorro-antd 国际化 **/
import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule,FormsModule, AppRoutingModule, FontAwesomeModule],
  bootstrap: [AppComponent],
  providers: [provideNzI18n(zh_CN)]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas);
  }
 }
