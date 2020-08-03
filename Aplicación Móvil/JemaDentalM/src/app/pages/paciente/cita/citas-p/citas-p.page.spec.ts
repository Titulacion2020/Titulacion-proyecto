import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitasPPage } from './citas-p.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('CitasPPage', () => {
  let component: CitasPPage;
  let fixture: ComponentFixture<CitasPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPPage ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, AngularFireAuthModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CitasPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
