import { Camera } from '@ionic-native/camera/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [IonicModule.forRoot(), AngularFirestoreModule,
        AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase)],
      schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [Camera]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
