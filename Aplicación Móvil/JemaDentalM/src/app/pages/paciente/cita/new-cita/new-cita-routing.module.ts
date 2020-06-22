import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCitaPage } from './new-cita.page';

const routes: Routes = [
  {
    path: '',
    component: NewCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCitaPageRoutingModule {}
