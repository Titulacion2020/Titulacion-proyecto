import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from './../../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TratamientosPage } from './tratamientos.page';
import { AngularFireModule } from '@angular/fire';

describe('TratamientosPage', () => {
  let component: TratamientosPage;
  let fixture: ComponentFixture<TratamientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientosPage ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule],
    //  providers: [{ provide: AngularFirestore, useValue:{}}]
    }).compileComponents();

    fixture = TestBed.createComponent(TratamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
