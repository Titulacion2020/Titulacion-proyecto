import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesListPage } from './pacientes-list.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesListPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesListPageRoutingModule {}
