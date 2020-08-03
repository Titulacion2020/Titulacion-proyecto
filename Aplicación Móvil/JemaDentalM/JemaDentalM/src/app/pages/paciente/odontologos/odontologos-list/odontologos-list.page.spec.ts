import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdontologosListPage } from './odontologos-list.page';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

describe('OdontologosListPage', () => {
  let component: OdontologosListPage;
  let fixture: ComponentFixture<OdontologosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontologosListPage ],
      imports: [IonicModule.forRoot(), FormsModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase), RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OdontologosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
