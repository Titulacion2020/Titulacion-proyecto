import { ModalEditOPageModule } from './modal-edit-o/modal-edit-o.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ModalEditOPageModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
