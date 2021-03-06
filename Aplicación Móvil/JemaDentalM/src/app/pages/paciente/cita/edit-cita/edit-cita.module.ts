import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCitaPageRoutingModule } from './edit-cita-routing.module';

import { EditCitaPage } from './edit-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCitaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditCitaPage]
})
export class EditCitaPageModule {}
