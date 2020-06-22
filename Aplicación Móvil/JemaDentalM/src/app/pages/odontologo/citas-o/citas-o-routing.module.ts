import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasOPage } from './citas-o.page';

const routes: Routes = [
  {
    path: '',
    component: CitasOPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasOPageRoutingModule {}
