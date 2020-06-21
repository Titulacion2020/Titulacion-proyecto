import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule} from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule, MatDialogRef, MatInputModule, MatIconModule, MatMenuModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule,
        ToastrModule.forRoot(), MatToolbarModule, MatCardModule, AngularFireStorageModule, FormsModule, ReactiveFormsModule,
        MatDialogModule, MatFormFieldModule, MatInputModule, HttpClientModule, BrowserAnimationsModule,
        MatIconModule, MatMenuModule, RouterTestingModule.withRoutes([])
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
