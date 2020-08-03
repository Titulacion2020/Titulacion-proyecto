import { Camera } from '@ionic-native/camera/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPPage } from './perfil-p.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


describe('PerfilPPage', () => {
  let component: PerfilPPage;
  let fixture: ComponentFixture<PerfilPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
        providers: [Camera]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
