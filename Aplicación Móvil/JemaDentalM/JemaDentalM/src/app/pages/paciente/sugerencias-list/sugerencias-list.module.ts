import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerenciasListPageRoutingModule } from './sugerencias-list-routing.module';

import { SugerenciasListPage } from './sugerencias-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugerenciasListPageRoutingModule
  ],
  declarations: [SugerenciasListPage]
})
export class SugerenciasListPageModule {}
