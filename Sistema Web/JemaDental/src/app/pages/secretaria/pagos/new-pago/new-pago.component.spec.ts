import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagoComponent } from './new-pago.component';
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
import { MatDialogRef, MatDialogModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewPagoComponent', () => {
  let component: NewPagoComponent;
  let fixture: ComponentFixture<NewPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPagoComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, ToastrModule.forRoot(), AngularFireAuthModule,
        RouterTestingModule.withRoutes([]), MatToolbarModule, AngularFireStorageModule, 
        FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatDialogModule,
        MatInputModule, MatSelectModule, HttpClientModule, BrowserAnimationsModule, MatDatepickerModule,
        MatNativeDateModule, MatGridListModule, MatAutocompleteModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar el valor a pagar, cuando se ingrese el valor en el campo', () =>{
    let valorPago = component.pagoForm.controls['valorPagar'];
    valorPago.setValue('20');
    expect(component.pagoForm.valid).toBeFalsy();
    expect(valorPago.hasError('pattern', ['pattern'])).toEqual(false);
    let errors = {};
    errors = valorPago.errors || {};
    expect (errors['required']).toBeFalsy(); 
  });

  it('Debería validar el seguro médico, cuando se registra un pago', ()=>{
    let seguro = component.pagoForm.controls['seguro'];
    expect(seguro.valid).toBeFalsy();
    let errors = {};
    errors = seguro.errors || {};
    expect (errors['required']).toBeTruthy(); 
  });

});
