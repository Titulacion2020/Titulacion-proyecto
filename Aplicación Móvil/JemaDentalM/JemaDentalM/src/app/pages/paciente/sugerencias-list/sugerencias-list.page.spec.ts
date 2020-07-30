import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugerenciasListPage } from './sugerencias-list.page';
import { AngularFireModule } from '@angular/fire';

describe('SugerenciasListPage', () => {
  let component: SugerenciasListPage;
  let fixture: ComponentFixture<SugerenciasListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugerenciasListPage ],
      imports: [IonicModule.forRoot(), AngularFireAuthModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),  RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SugerenciasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
