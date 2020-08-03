import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacientesListPage } from './pacientes-list.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

describe('PacientesListPage', () => {
  let component: PacientesListPage;
  let fixture: ComponentFixture<PacientesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesListPage ],
      imports: [IonicModule.forRoot(), AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
