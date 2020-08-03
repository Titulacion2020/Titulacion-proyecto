import { PerfilPPage } from './../perfil-p/perfil-p.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPPageRoutingModule } from './menu-p-routing.module';

import { MenuPPage } from './menu-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPPageRoutingModule
  ],
  declarations: [MenuPPage]
})
export class MenuPPageModule {}
