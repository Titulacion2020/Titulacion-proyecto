import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEditPage } from './modal-edit.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('ModalEditPage', () => {
  let component: ModalEditPage;
  let fixture: ComponentFixture<ModalEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditPage ],
      imports: [IonicModule.forRoot(), AngularFirestoreModule, AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)],
      schemas: [
          NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
