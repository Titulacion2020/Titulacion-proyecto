import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitasOPage } from './citas-o.page';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('CitasOPage', () => {
  let component: CitasOPage;
  let fixture: ComponentFixture<CitasOPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasOPage ],
      imports: [IonicModule.forRoot(), AngularFirestoreModule, AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule, RouterTestingModule.withRoutes([]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CitasOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
