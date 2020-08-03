import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { InicioPPage } from './inicio-p.page';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('InicioPPage', () => {
  let component: InicioPPage;
  let fixture: ComponentFixture<InicioPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioPPage ],
      imports: [IonicModule.forRoot(), AngularFirestoreModule, RouterTestingModule.withRoutes([]),
        AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
