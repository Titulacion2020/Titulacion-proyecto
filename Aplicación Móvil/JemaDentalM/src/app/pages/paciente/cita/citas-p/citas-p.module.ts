import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPPageRoutingModule } from './citas-p-routing.module';

import { CitasPPage } from './citas-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPPageRoutingModule,
  ],
  declarations: [CitasPPage]
})
export class CitasPPageModule {}
