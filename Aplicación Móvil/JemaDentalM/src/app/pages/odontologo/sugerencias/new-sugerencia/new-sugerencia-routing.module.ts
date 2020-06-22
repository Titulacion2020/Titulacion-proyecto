import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSugerenciaPage } from './new-sugerencia.page';

const routes: Routes = [
  {
    path: '',
    component: NewSugerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSugerenciaPageRoutingModule {}
