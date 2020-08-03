import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { notEqual } from 'assert';

describe('InicioPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, AngularFireAuthModule, RouterTestingModule.withRoutes([]), HttpClientModule],
      providers: [FCM]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Deberia crearse la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia validar que el usuario se encuentre registrado', done  => {
    const user = 'admin@ivonne.com';
    const pass = 'Ivonne123';

    component.authService.login(user, pass).then(res => {
      expect(typeof res).toBe('object');
      done();
    }).catch((err) => {
      expect(err.message).toEqual('expected');
    });
  });

  it('Deberia validar los campos de inicio de sesion', () => {
    component.password = 'Ivonne123';
    component.cedula = '1726706102';

    expect(component.cedula.length).toBe(10);
    expect(component.password.length).not.toBe(0);
  });

});
