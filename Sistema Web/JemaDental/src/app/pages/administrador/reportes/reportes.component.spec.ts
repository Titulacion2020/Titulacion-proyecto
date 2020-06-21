import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComponent } from './reportes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MatPaginatorModule, MatPaginator, MatTableModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

describe('ReportesComponent', () => {
  let component: ReportesComponent;
  let fixture: ComponentFixture<ReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), RouterTestingModule.withRoutes([]), 
      AngularFireAuthModule, ToastrModule, AngularFirestoreModule, AngularFireStorageModule, MatPaginatorModule,
      ToastrModule.forRoot(), MatTableModule, HttpClientModule, BrowserAnimationsModule, MatSelectModule,
      MatAutocompleteModule, MatDatepickerModule, MatIconModule, MatMenuModule, MatNativeDateModule,
      FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule
      ],
      
      providers: [{ provide: MatPaginator, AngularFirestore}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar la selección de un tipo de reporte', ()=>{
    let tipoReporte = component.reportForm.controls['tipoReporte'];
    expect(tipoReporte.valid).toBeFalsy();
    let errors = {};
    errors = tipoReporte.errors || {};
    expect (errors['required']).toBeTruthy(); 
    tipoReporte.setValue('pagos generales');
    expect(tipoReporte.hasError('pattern', ['pattern'])).toEqual(false);
  });

  it('Debería validar que se ingrese la fecha inicial', () =>{
    let fechaI = component.reportForm.controls['fechaInicio'];
    expect(fechaI.valid).toBeFalsy();

    let errors = {};
    errors = fechaI.errors || {};
    expect (errors['required']).toBeTruthy();
  });

  it('Debería validar que se ingrese la fecha final', () =>{
    let fechaF = component.reportForm.controls['fechaFin'];
    expect(fechaF.valid).toBeFalsy();

    let errors = {};
    errors = fechaF.errors || {};
    expect (errors['required']).toBeTruthy();
  });

});
