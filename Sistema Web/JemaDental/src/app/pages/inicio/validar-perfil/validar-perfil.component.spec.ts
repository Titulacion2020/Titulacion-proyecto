import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPerfilComponent } from './validar-perfil.component';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule} from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ValidarPerfilComponent', () => {
  let component: ValidarPerfilComponent;
  let fixture: ComponentFixture<ValidarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPerfilComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, 
        RouterTestingModule, BrowserModule, AngularFirestoreModule,
        ToastrModule.forRoot(), MatFormFieldModule, FormsModule, ReactiveFormsModule,
        AngularFireStorageModule, HttpClientModule, BrowserAnimationsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
