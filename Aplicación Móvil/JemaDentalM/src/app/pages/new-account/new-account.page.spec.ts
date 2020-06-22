import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewAccountPage } from './new-account.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

describe('NewAccountPage', () => {
  let component: NewAccountPage;
  let fixture: ComponentFixture<NewAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountPage ],
      imports: [IonicModule.forRoot(), AngularFireAuthModule, RouterTestingModule.withRoutes([]),
      AngularFireModule.initializeApp(environment.firebase), HttpClientModule,
      AngularFirestoreModule],
      providers: [FCM],
      schemas: [
          NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Deberia crearse la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia validar el campo de la cédula', () => {

    component.cedula = '1726706102';
    expect(component.cedula).not.toBeUndefined();
    expect(component.cedula.length).toBe(10);
    expect(component.cedula).not.toBe('');
  });

  it('Deberia validar el número de teléfono', () => {
    component.telefono = '2851023';
    expect(component.telefono).not.toBe('');
    expect(component.telefono).not.toBeUndefined();
    expect(component.telefono.length).toBeGreaterThanOrEqual(7);
    expect(component.telefono.length).toBeLessThanOrEqual(9);
  });

  it('Debería validar el email', () => {
    const email = component.registroForm.controls.email;
    email.setValue('user@gmail.com');
    expect(email.hasError('pattern')).toEqual(false);

  });


});
