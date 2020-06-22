import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';


import { FormularioListPage } from './formulario-list.page';

describe('FormularioListPage', () => {
  let component: FormularioListPage;
  let fixture: ComponentFixture<FormularioListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioListPage ],
      imports: [IonicModule.forRoot(), AngularFirestoreModule, RouterTestingModule.withRoutes([]),
         AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
