import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { RestPasswordPage } from './rest-password.page';

describe('RestPasswordPage', () => {
  let component: RestPasswordPage;
  let fixture: ComponentFixture<RestPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPasswordPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RestPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
