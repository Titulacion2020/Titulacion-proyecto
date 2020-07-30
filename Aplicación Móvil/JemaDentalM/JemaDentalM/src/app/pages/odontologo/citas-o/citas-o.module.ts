import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasOPageRoutingModule } from './citas-o-routing.module';

import { CitasOPage } from './citas-o.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasOPageRoutingModule
  ],
  declarations: [CitasOPage]
})
export class CitasOPageModule {}
