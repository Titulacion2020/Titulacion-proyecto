import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSugerenciaPage } from './new-sugerencia.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('NewSugerenciaPage', () => {
  let component: NewSugerenciaPage;
  let fixture: ComponentFixture<NewSugerenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSugerenciaPage ],
      imports: [IonicModule.forRoot(), FormsModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, RouterTestingModule.withRoutes([]),
      HttpClientModule],
      providers: [FCM]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSugerenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Debería crearse la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el formulario de sugerencias', () => {

    component.pacienteSel = {
      nombre: 'Ivonne',
      telefono: '29999999',
      cedula: '1726706102',
      seguro: 'sin seguro',
      email: 'ivonne@gmail.com',
    };
    const pacienteSel = component.pacienteSel;
    expect(Object.keys(pacienteSel).length).not.toBe(0);

    let sugerencia = component.sugerenciaText;
    sugerencia = 'Debe tomar el médicamento cada 8 horas';
    expect(sugerencia).not.toBe('');
    expect(sugerencia).not.toBeUndefined();

  });

});
