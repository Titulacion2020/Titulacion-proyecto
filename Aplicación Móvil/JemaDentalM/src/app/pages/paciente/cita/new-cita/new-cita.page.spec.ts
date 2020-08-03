import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { NewCitaPage } from './new-cita.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

describe('NewCitaPage', () => {
  let component: NewCitaPage;
  let fixture: ComponentFixture<NewCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCitaPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
        RouterTestingModule.withRoutes([]), HttpClientModule],
        providers: [LocalNotifications, FCM]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Debería crearse la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar la selección de la hora', () => {
    const hora = component.CitaMform.controls.hora;
    hora.setValue('09:30');
    expect(hora.hasError('required')).toEqual(false);
  });

  it('Debería validar el registro de la cita', () => {
    const cipaciente = component.CitaMform.controls.cipaciente;
    cipaciente.setValue('1711787166');
    const especialidad = component.CitaMform.controls.especialidad;
    especialidad.setValue('odontologia general');
    const odontologo = component.CitaMform.controls.odontologo;
    odontologo.setValue('David Vega');
    const estado = component.CitaMform.controls.estado;
    estado.setValue('pendiente');
    expect(component.CitaMform.valid).toBeTruthy();
  });
});

