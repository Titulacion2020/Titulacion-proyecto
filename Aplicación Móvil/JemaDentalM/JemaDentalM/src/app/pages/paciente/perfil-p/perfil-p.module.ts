import { ModalEditPageModule } from './modal-edit/modal-edit.module';
import { ModalEditPage } from './modal-edit/modal-edit.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPPageRoutingModule } from './perfil-p-routing.module';

import { PerfilPPage } from './perfil-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPPageRoutingModule,
    ModalEditPageModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilPPage]
})
export class PerfilPPageModule {}
