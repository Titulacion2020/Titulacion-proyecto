import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';

import { EditFormularioPage } from './edit-formulario.page';

describe('EditFormularioPage', () => {
  let component: EditFormularioPage;
  let fixture: ComponentFixture<EditFormularioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormularioPage ],
      imports: [IonicModule.forRoot(), FormsModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase), RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
