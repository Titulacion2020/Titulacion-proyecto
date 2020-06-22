import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEditOPage } from './modal-edit-o.page';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('ModalEditOPage', () => {
  let component: ModalEditOPage;
  let fixture: ComponentFixture<ModalEditOPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditOPage ],
      imports: [IonicModule.forRoot(), FormsModule, IonicModule, ReactiveFormsModule,
        FormsModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, AngularFireAuthModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEditOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
