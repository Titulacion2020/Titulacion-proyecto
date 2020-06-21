import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeguroComponent } from './view-seguro.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
import { ToastrService, ToastrModule } from 'ngx-toastr';  

describe('ViewSeguroComponent', () => {
  let component: ViewSeguroComponent;
  let fixture: ComponentFixture<ViewSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSeguroComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), MatToolbarModule, 
        MatCardModule, MatInputModule, MatFormFieldModule, AngularFirestoreModule, AngularFireStorageModule, HttpClientModule, BrowserAnimationsModule,
        FormsModule, AngularFireAuthModule, ReactiveFormsModule, MatDialogModule, MatCheckboxModule, ToastrModule.forRoot()
      ],
        providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
