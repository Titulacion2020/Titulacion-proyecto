import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCitaComponent } from './new-cita.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogRef, MatDialogModule, MatInputModule, MatSelectModule, 
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewCitaComponent', () => {
  let component: NewCitaComponent;
  let fixture: ComponentFixture<NewCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCitaComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, ToastrModule.forRoot(), AngularFireAuthModule,
        RouterTestingModule.withRoutes([]), MatToolbarModule, AngularFireStorageModule, 
        FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatDialogModule,
        MatInputModule, MatSelectModule, HttpClientModule, BrowserAnimationsModule, MatDatepickerModule,
        MatNativeDateModule, MatAutocompleteModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar la selección de la hora', () =>{
    let hora = component.CitaMform.controls['hora'];
    expect(hora.valid).toBeFalsy();

    let errors = {};
    errors = hora.errors || {};
    expect (errors['required']).toBeTruthy();

    hora.setValue('9:20');
    errors = hora.errors || {};
    expect(hora.hasError('repeatHora', ['repeatHora'])).toEqual(false);  
  });

  it('Debería validar el registro de la cita médica', ()=>{
    let cipaciente = component.CitaMform.controls['cipaciente'];
    cipaciente.setValue('1765821268');
    let especialidad = component.CitaMform.controls['especialidad'];
    especialidad.setValue('otodoncia');
    let odontologo = component.CitaMform.controls['odontologo'];
    odontologo.setValue('Carlos Dias');
    let estado = component.CitaMform.controls['estado'];
    estado.setValue('pendiente');
    expect(component.CitaMform.valid).toBeTruthy();
  });

});
