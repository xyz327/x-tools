import { FeatureLayoutComponent } from './feature-layout/feature-layout.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateConvertComponent } from 'src/app/popup/date-convert/date-convert.component';
import { IndexComponent } from "src/app/popup/index/index.component";
import { RandomStringComponent } from './random-string/random-string.component';
import { SettingsComponent } from './settings/settings.component';
import { EncodingComponent } from './encoding/encoding.component';
import { JsonComponent } from './json/json.component';
import { DiffComponent } from './diff/diff.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'feature',
    component: FeatureLayoutComponent,
    children: [
      {
        path: 'date-convert',
        component: DateConvertComponent
      },
      {
        path: 'random-string',
        component: RandomStringComponent
      },
      {
        path: 'encoding',
        component: EncodingComponent
      },
      {
        path: 'json',
        component: JsonComponent
      },
      {
        path: 'diff',
        component: DiffComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule { }
