import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesListComponent } from './pacientes-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule} from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator, MatIconModule, MatTableModule, MatDialogModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PacientesListComponent', () => {
  let component: PacientesListComponent;
  let fixture: ComponentFixture<PacientesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesListComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), MatPaginatorModule,
        MatToolbarModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
        AngularFirestoreModule, AngularFireStorageModule, ToastrModule.forRoot(), RouterTestingModule.withRoutes([]),
        AngularFireAuthModule, MatIconModule, HttpClientModule, BrowserAnimationsModule, MatTableModule,
        MatDialogModule, MatInputModule
      ],
      providers: [{ provide: MatPaginator, AngularFirestore}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
