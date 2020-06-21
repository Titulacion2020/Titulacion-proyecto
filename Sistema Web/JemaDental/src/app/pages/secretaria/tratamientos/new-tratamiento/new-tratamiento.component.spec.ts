import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTratamientoComponent } from './new-tratamiento.component';
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
import { MatDialogRef, MatDialogModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewTratamientoComponent', () => {
  let component: NewTratamientoComponent;
  let fixture: ComponentFixture<NewTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTratamientoComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, ToastrModule.forRoot(), AngularFireAuthModule,
        RouterTestingModule.withRoutes([]), MatToolbarModule, AngularFireStorageModule, 
        FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatDialogModule,
        MatInputModule, MatSelectModule, HttpClientModule, BrowserAnimationsModule, MatDatepickerModule,
        MatNativeDateModule, MatCheckboxModule, MatAutocompleteModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el registro del tratamiento', ()=>{
    let cipaciente = component.TratamientoMform.controls['cipaciente'];
    cipaciente.setValue('1765821268');
    let especialidad = component.TratamientoMform.controls['especialidad'];
    especialidad.setValue('otodoncia');
    let odontologo = component.TratamientoMform.controls['odontologo'];
    odontologo.setValue('Carlos Dias');
    let tratamiento = component.TratamientoMform.controls['tratamiento'];
    tratamiento.setValue('limpieza bucal');
    let observacion = component.TratamientoMform.controls['observacion'];
    observacion.setValue('Primer atención');
    let precio = component.TratamientoMform.controls['precio'];
    precio.setValue('40');
    expect(component.TratamientoMform.valid).toBeFalsy();
    expect (cipaciente.hasError('required', ['required'])).toEqual(false);
    expect (especialidad.hasError('required', ['required'])).toEqual(false);
    expect (odontologo.hasError('required', ['required'])).toEqual(false);
    expect (tratamiento.hasError('required', ['required'])).toEqual(false);
    expect (observacion.hasError('required', ['required'])).toEqual(false);
    expect (precio.hasError('required', ['required'])).toEqual(false);
  });

  it('Debería validar el precio del tramiento', () =>{
    let precio = component.TratamientoMform.controls['precio'];
    precio.setValue('50');
    expect(component.TratamientoMform.valid).toBeFalsy();
    expect(precio.hasError('pattern', ['pattern'])).toEqual(false);
    let errors = {};
    errors = precio.errors || {};
    expect (precio.hasError('required', ['required'])).toEqual(false);
  });

});
