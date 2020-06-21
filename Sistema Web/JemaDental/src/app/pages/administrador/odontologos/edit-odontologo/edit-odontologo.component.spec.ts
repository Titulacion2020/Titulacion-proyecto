import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOdontologoComponent } from './edit-odontologo.component';
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

describe('EditOdontologoComponent', () => {
  let component: EditOdontologoComponent;
  let fixture: ComponentFixture<EditOdontologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOdontologoComponent ],
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
    fixture = TestBed.createComponent(EditOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
