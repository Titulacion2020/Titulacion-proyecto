import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOdontologoComponent } from './new-odontologo.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatToolbarModule, MatAutocompleteModule, MatIconModule, MatInputModule, MatSelectModule, MatGridListModule, MatCardModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';


describe('NewOdontologoComponent', () => {
  let component: NewOdontologoComponent;
  let fixture: ComponentFixture<NewOdontologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOdontologoComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
        AngularFireAuthModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
        ToastrModule.forRoot(), MatDialogModule, BrowserAnimationsModule, MatAutocompleteModule, MatIconModule,
        MatInputModule, MatSelectModule, MatGridListModule, MatCardModule, MatCheckboxModule, MatRadioModule,
        HttpClientModule, AngularFireStorageModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el email cuando se digite en el campo', ()=>{
    let email = component.Odonform.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors || {};
    expect (errors['required']).toBeTruthy();
    
  /*  email.setValue('user@gmail.com');
    errors = email.errors || {};
    expect(email.hasError('pattern', ['pattern'])).toEqual(false);
  */
  });

  
  it('Debería validar el número de cédula, cuando el campo no este vacío', ()=>{
    let cedula = component.Odonform.controls['cedula'];
    expect(cedula.valid).toBeFalsy();

    let errors = {};
    errors = cedula.errors || {};
    expect (errors['required']).toBeTruthy();
   /*
    cedula.setValue('1725542961');
    expect(cedula.hasError('minlength', ['minlength'])).toEqual(false);
  */
  });
  
});
