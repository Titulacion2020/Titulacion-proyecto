import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPPage } from './menu-p.page';

const routes: Routes = [
  {
    path: 'p',
    component: MenuPPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('../perfil-p/perfil-p.module').then(m => m.PerfilPPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio-p/inicio-p.module').then(m => m.InicioPPageModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('../cita/citas-p/citas-p.module').then( m => m.CitasPPageModule)
      },
  /* {
    path: 'citasList',
    loadChildren: () => import('../citas-list/citas-list.module').then( m => m.CitasListPageModule)
  }, */
      {
        path: 'newCita',
        loadChildren: () => import('../cita/new-cita/new-cita.module').then( m => m.NewCitaPageModule)
      },
      {
        path: 'editCita',
        loadChildren: () => import('../cita/edit-cita/edit-cita.module').then( m => m.EditCitaPageModule)
      },
      {
        path: 'odontologos',
        loadChildren: () => import('../odontologos/odontologos-list/odontologos-list.module').then( m => m.OdontologosListPageModule)
      },
      {
        path: 'sugerencias',
        loadChildren: () => import('../sugerencias-list/sugerencias-list.module').then( m => m.SugerenciasListPageModule)
      },
      {
        path: 'newFormulario',
        loadChildren: () => import('../formularios/formulario/formulario.module').then( m => m.FormularioPageModule)
      },
      {
        path: 'solicitudes',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('../formularios/formulario/formulario-list/formulario-list.module').then( m => m.FormularioListPageModule)
      },
      {
        path: 'editFormulario',
        loadChildren: () => import('../formularios/edit-formulario/edit-formulario.module').then( m => m.EditFormularioPageModule)
      },
      {
        path: 'nosotros',
        loadChildren: () => import('../../shared/nosotros/nosotros/nosotros.module').then(m => m.NosotrosPageModule)
      },
      {
        path: 'contactanos',
        loadChildren: () => import('../../shared/contactanos/contactanos/contactanos.module').then(m => m.ContactanosPageModule)
      }

    ]
  },

  {
    path: '',
    redirectTo: 'p/inicio',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPPageRoutingModule { }
