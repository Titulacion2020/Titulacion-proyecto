import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCitaPageRoutingModule } from './new-cita-routing.module';

import { NewCitaPage } from './new-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCitaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewCitaPage]
})
export class NewCitaPageModule {}
