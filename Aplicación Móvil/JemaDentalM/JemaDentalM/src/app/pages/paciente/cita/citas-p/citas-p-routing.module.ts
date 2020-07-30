import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasPPage } from './citas-p.page';

const routes: Routes = [
  {
    path: '',
    component: CitasPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPPageRoutingModule {}
