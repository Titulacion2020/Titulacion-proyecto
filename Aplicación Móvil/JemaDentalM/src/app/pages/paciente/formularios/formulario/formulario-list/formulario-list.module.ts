import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioListPageRoutingModule } from './formulario-list-routing.module';

import { FormularioListPage } from './formulario-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioListPageRoutingModule,
    AngularFirestoreModule
  ],
  declarations: [FormularioListPage]
})
export class FormularioListPageModule {}
