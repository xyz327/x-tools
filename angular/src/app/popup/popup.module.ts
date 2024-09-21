import { PopupComponent } from './popup.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupRoutingModule } from './popup-routing.module';
import { FeatureLayoutComponent } from './feature-layout/feature-layout.component';
import { DateConvertComponent } from './date-convert/date-convert.component';
import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RandomStringComponent } from './random-string/random-string.component';
//import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { SettingsComponent } from './settings/settings.component';
import { EncodingComponent } from './encoding/encoding.component';
import { JsonComponent } from './json/json.component';
@NgModule({
  declarations: [PopupComponent, DateConvertComponent, IndexComponent, FeatureLayoutComponent, RandomStringComponent,SettingsComponent,EncodingComponent,JsonComponent],
  imports: [CommonModule,FormsModule, PopupRoutingModule,FontAwesomeModule]
})
export class PopupModule {}
