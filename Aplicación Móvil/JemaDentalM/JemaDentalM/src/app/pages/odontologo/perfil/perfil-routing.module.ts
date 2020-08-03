import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  },
  {
    path: 'modalEditO',
    loadChildren: () => import('./modal-edit-o/modal-edit-o.module').then( m => m.ModalEditOPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
