import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdontologosListPage } from './odontologos-list.page';

const routes: Routes = [
  {
    path: '',
    component: OdontologosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdontologosListPageRoutingModule {}
