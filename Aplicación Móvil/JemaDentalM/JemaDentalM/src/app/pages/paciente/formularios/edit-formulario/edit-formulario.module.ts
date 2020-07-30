import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFormularioPageRoutingModule } from './edit-formulario-routing.module';

import { EditFormularioPage } from './edit-formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFormularioPageRoutingModule
  ],
  declarations: [EditFormularioPage]
})
export class EditFormularioPageModule {}
