import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarEliminarEspecialidadComponent } from './aprobar-eliminar-especialidad.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { EspecialidadService } from './../../../../../services/especialidad/especialidad.service';

describe('AprobarEliminarEspecialidadComponent', () => {
  let component: AprobarEliminarEspecialidadComponent;
  let fixture: ComponentFixture<AprobarEliminarEspecialidadComponent>;
  let espeSerivice: EspecialidadService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarEliminarEspecialidadComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), MatToolbarModule, FormsModule, ReactiveFormsModule, 
        RouterTestingModule.withRoutes([]), AngularFireStorageModule, ToastrModule.forRoot(), AngularFireAuthModule,
        AngularFirestoreModule, HttpClientModule, MatDialogModule], 
      providers: [ { provide:  MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarEliminarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
