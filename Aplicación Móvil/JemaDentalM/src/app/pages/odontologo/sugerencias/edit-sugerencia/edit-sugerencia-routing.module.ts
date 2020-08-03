import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSugerenciaPage } from './edit-sugerencia.page';

const routes: Routes = [
  {
    path: '',
    component: EditSugerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSugerenciaPageRoutingModule {}
