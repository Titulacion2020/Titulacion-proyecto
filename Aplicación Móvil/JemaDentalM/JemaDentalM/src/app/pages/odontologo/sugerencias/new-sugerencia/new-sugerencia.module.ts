import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSugerenciaPageRoutingModule } from './new-sugerencia-routing.module';

import { NewSugerenciaPage } from './new-sugerencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSugerenciaPageRoutingModule
  ],
  declarations: [NewSugerenciaPage]
})
export class NewSugerenciaPageModule {}
