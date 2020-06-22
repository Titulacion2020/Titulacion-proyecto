import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuOPage } from './menu-o.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

describe('MenuOPage', () => {
  let component: MenuOPage;
  let fixture: ComponentFixture<MenuOPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
