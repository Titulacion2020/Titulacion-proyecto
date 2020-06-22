import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPPage } from './perfil-p.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPPage
  },
  {
    path: 'modal-edit',
    loadChildren: () => import('./modal-edit/modal-edit.module').then( m => m.ModalEditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPPageRoutingModule {}
