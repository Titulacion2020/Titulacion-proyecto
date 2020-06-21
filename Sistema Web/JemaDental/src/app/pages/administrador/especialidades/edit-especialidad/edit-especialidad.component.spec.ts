import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspecialidadComponent } from './edit-especialidad.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatToolbarModule, MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditEspecialidadComponent', () => {
  let component: EditEspecialidadComponent;
  let fixture: ComponentFixture<EditEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEspecialidadComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
        AngularFireAuthModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
        ToastrModule.forRoot(), MatDialogModule, BrowserAnimationsModule, MatAutocompleteModule, MatIconModule,
        MatInputModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
