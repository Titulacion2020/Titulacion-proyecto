import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarEliminarSeguroComponent } from './aprobar-eliminar-seguro.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

describe('AprobarEliminarSeguroComponent', () => {
  let component: AprobarEliminarSeguroComponent;
  let fixture: ComponentFixture<AprobarEliminarSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarEliminarSeguroComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), FormsModule, ReactiveFormsModule, 
        RouterTestingModule.withRoutes([]), AngularFireStorageModule, ToastrModule.forRoot(), AngularFireAuthModule,
        AngularFirestoreModule, HttpClientModule, MatDialogModule, MatToolbarModule
      ], 
      providers: [ { provide:  MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarEliminarSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
