import { FeatureLayoutComponent } from './feature-layout/feature-layout.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateConvertComponent } from 'src/app/popup/date-convert/date-convert.component';
import { IndexComponent } from "src/app/popup/index/index.component";
import { RandomStringComponent } from './random-string/random-string.component';
import { SettingsComponent } from './settings/settings.component';

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
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'index'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule { }
