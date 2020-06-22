import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { EditCitaPage } from './edit-cita.page';

describe('EditCitaPage', () => {
  let component: EditCitaPage;
  let fixture: ComponentFixture<EditCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCitaPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase), RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
