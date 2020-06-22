import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacientesListPage } from './pacientes-list.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('PacientesListPage', () => {
  let component: PacientesListPage;
  let fixture: ComponentFixture<PacientesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesListPage ],
      imports: [IonicModule.forRoot(), AngularFireAuthModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
