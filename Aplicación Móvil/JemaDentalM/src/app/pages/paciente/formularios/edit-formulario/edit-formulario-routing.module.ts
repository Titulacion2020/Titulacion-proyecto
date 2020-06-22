import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFormularioPage } from './edit-formulario.page';

const routes: Routes = [
  {
    path: '',
    component: EditFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFormularioPageRoutingModule {}
