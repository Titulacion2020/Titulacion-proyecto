import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuOPageRoutingModule } from './menu-o-routing.module';

import { MenuOPage } from './menu-o.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuOPageRoutingModule
  ],
  declarations: [MenuOPage]
})
export class MenuOPageModule {}
