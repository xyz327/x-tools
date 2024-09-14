import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'popup',
    loadChildren: () => import('./popup/popup.module').then(m => m.PopupModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./modules/options/options.module').then(m => m.OptionsModule)
  },
  {
    path: '**',
    redirectTo: 'popup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
