import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPacienteComponent } from './edit-paciente.component';
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
import { MatDialogRef, MatDialogModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditPacienteComponent', () => {
  let component: EditPacienteComponent;
  let fixture: ComponentFixture<EditPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPacienteComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, ToastrModule.forRoot(), AngularFireAuthModule,
        RouterTestingModule.withRoutes([]), MatToolbarModule, AngularFireStorageModule, 
        FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatDialogModule,
        MatInputModule, MatSelectModule, HttpClientModule, BrowserAnimationsModule, MatDatepickerModule,
        MatNativeDateModule, MatGridListModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
