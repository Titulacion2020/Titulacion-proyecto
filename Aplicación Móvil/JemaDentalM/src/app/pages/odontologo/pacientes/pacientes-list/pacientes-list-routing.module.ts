import { TratamientosPageModule } from './../tratamientos/tratamientos.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesListPage } from './pacientes-list.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesListPage
  },
  { 
    path: 'tratamientos',
    loadChildren: () => import('../tratamientos/tratamientos.module').then( m => m.TratamientosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesListPageRoutingModule {}
