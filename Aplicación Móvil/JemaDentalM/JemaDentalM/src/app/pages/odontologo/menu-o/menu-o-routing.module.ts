import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOPage } from './menu-o.page';

const routes: Routes = [
  {
    path: 'o',
    component: MenuOPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule),
      },
      {
        path: 'nosotros',
        loadChildren: () => import('../../shared/nosotros/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
      },
      {
        path: 'contactanos',
        loadChildren: () => import('../../shared/contactanos/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('../citas-o/citas-o.module').then( m => m.CitasOPageModule)
      },
      {
        path: 'sugerencias',
        loadChildren: () => import('../sugerencias/pacientes-list/pacientes-list.module').then( m => m.PacientesListPageModule)
      },
      {
        path: 'pacientes',
        loadChildren: () => import('../pacientes/pacientes-list/pacientes-list.module').then( m => m.PacientesListPageModule),
      },
      {
        path: 'newSugerencia',
        loadChildren: () => import('../sugerencias/new-sugerencia/new-sugerencia.module').then( m => m.NewSugerenciaPageModule)
      },
      {
        path: 'editSugerencia',
        loadChildren: () => import('../sugerencias/edit-sugerencia/edit-sugerencia.module').then( m => m.EditSugerenciaPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'o/inicio',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuOPageRoutingModule {}
