import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdontologosListPageRoutingModule } from './odontologos-list-routing.module';

import { OdontologosListPage } from './odontologos-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdontologosListPageRoutingModule
  ],
  declarations: [OdontologosListPage]
})
export class OdontologosListPageModule {}
