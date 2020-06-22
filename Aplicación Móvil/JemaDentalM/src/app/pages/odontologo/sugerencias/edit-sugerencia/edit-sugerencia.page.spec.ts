import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { EditSugerenciaPage } from './edit-sugerencia.page';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('EditSugerenciaPage', () => {
  let component: EditSugerenciaPage;
  let fixture: ComponentFixture<EditSugerenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSugerenciaPage ],
      imports: [IonicModule.forRoot(), FormsModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSugerenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
