import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeguroComponent } from './new-seguro.component';
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

describe('NewSeguroComponent', () => {
  let component: NewSeguroComponent;
  let fixture: ComponentFixture<NewSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSeguroComponent ],
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
    fixture = TestBed.createComponent(NewSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el seguro, cuando se ingrese un nuevo seguro', () =>{
    let nombre = component.seguroForm.controls['nombre'];
    expect(nombre.valid).toBeFalsy();

    let errors = {};
    errors = nombre.errors || {};
    expect (errors['repeatseguro']).toBeFalsy();
/*
    errors = nombre.errors || {};
    expect (errors['required']).toBeTruthy();
    */
  });

  it('Debería validar el email, cuando se digite en el campo', () =>{
    let email = component.seguroForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors || {};
    expect (errors['required']).toBeTruthy();

    errors = email.errors || {};
    expect (errors['repeatEmailOdonto']).toBeFalsy();
    /*
    email.setValue('user@gmail.com');
    errors = email.errors || {};
    expect(email.hasError('pattern', ['pattern'])).toEqual(false);
    */
  });

});
