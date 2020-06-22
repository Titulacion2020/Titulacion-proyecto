import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSugerenciaPageRoutingModule } from './edit-sugerencia-routing.module';

import { EditSugerenciaPage } from './edit-sugerencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSugerenciaPageRoutingModule
  ],
  declarations: [EditSugerenciaPage]
})
export class EditSugerenciaPageModule {}
