import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioListPage } from './formulario-list.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioListPageRoutingModule {}
