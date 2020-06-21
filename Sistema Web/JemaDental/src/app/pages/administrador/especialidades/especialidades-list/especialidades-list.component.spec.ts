import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesListComponent } from './especialidades-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule, MatDialogModule, MatPaginator, MatPaginatorModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('EspecialidadesListComponent', () => {
  let component: EspecialidadesListComponent;
  let fixture: ComponentFixture<EspecialidadesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadesListComponent ],
      imports: [ MatToolbarModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, AngularFireAuthModule, ToastrModule.forRoot(), MatIconModule,
        MatDialogModule, MatPaginatorModule, BrowserAnimationsModule, MatInputModule, AngularFireStorageModule,
        MatButtonModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, MatTableModule, RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
   
      providers: [{ provide: MatPaginator, AngularFirestore}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
