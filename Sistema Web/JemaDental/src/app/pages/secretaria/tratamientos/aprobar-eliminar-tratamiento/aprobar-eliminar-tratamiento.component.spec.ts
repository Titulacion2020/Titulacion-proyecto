import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarEliminarTratamientoComponent } from './aprobar-eliminar-tratamiento.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AprobarEliminarTratamientoComponent', () => {
  let component: AprobarEliminarTratamientoComponent;
  let fixture: ComponentFixture<AprobarEliminarTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarEliminarTratamientoComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), ToastrModule.forRoot(), AngularFireAuthModule,
        RouterTestingModule.withRoutes([]), MatToolbarModule, MatDialogModule,
        AngularFirestoreModule, AngularFireStorageModule, HttpClientModule, BrowserAnimationsModule],
     providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarEliminarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
