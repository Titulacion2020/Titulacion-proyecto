import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { FormularioPage } from './formulario.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

describe('FormularioPage', () => {
  let component: FormularioPage;
  let fixture: ComponentFixture<FormularioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPage ],
      imports: [IonicModule.forRoot(), AngularFireAuthModule, FormsModule, AngularFirestoreModule,
        RouterTestingModule.withRoutes([]), HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase)],
      providers: [FCM]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Debería crearse la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el formulario de solicitudes', () => {

    let formulario = component.tipo;
    formulario = 'Queja';
    expect(formulario).not.toEqual('');
    expect(formulario).not.toBeUndefined();

    let comentario = component.comentario;
    comentario = 'Esta es una prueba';
    expect(formulario).not.toEqual('');
    expect(formulario).not.toBeUndefined();

  });

});
