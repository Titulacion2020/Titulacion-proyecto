import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasListPage } from './sugerencias-list.page';

const routes: Routes = [
  {
    path: '',
    component: SugerenciasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciasListPageRoutingModule {}
