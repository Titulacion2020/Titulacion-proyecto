import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEspecialidadComponent } from './new-especialidad.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatToolbarModule, MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { of } from 'rxjs';

describe('NewEspecialidadComponent', () => {
  let component: NewEspecialidadComponent;
  let fixture: ComponentFixture<NewEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEspecialidadComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
        AngularFireAuthModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
        ToastrModule.forRoot(), MatDialogModule, BrowserAnimationsModule, MatAutocompleteModule, MatIconModule,
        MatInputModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService, EspecialidadService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería Validar que los campos no se encuentren vacios', ()=>{
    
   // spyOn(component, 'es').and.returnValue(false);
   // expect(component.existID_pacientList).toHaveBeenCalled();
    
    //const resutado = component.msgValidateNombre();
  // const resul=  component.especialidadForm.hasError('required')
    //expect(resul).toBe('required');

    let itemname = component.especialidadForm.controls['nombre'];
   // itemname.setValue('Ortodoncia');
    expect(itemname.valid).toBeFalsy();

    let descripcion = component.especialidadForm.controls['descripcion'];
    descripcion.setValue('cuidado de dientes');

    let errors = {};
    errors = itemname.errors || {};
    expect (errors['required']).toBeTruthy();
   // expect(component.especialidadForm.valid).toBeTruthy();
   
  })

 /* it('deberia validar guardar la especialidad', () =>{
    const especialidad  = {
      nombre: 'odontologia general',
      descripcion: 'tratamientos'
    }
      
    spyOn(component.espeService, 'addEspecialidad').and.returnValue(of)
  })
  */

});
