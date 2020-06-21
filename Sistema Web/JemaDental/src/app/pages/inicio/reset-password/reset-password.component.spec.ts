import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule} from 'ngx-toastr';
import { MatDialogModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [AngularFireAuthModule, ToastrModule.forRoot(), MatDialogModule, MatToolbarModule,
        AngularFireModule.initializeApp(environment.firebase), RouterTestingModule,
        AngularFireStorageModule, HttpClientModule, BrowserAnimationsModule, AngularFirestoreModule,
        FormsModule, ReactiveFormsModule, MatCardModule, MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
