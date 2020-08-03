import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditOPageRoutingModule } from './modal-edit-o-routing.module';

import { ModalEditOPage } from './modal-edit-o.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditOPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEditOPage]
})
export class ModalEditOPageModule {}
