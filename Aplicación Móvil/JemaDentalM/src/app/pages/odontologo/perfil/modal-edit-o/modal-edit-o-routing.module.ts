import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditOPage } from './modal-edit-o.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditOPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditOPageRoutingModule {}
