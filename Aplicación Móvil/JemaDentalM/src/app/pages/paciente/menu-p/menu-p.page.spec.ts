import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { MenuPPage } from './menu-p.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('MenuPPage', () => {
  let component: MenuPPage;
  let fixture: ComponentFixture<MenuPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
