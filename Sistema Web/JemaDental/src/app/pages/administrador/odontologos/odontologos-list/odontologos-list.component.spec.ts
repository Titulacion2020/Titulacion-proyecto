import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontologosListComponent } from './odontologos-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatPaginator, MatIconModule, MatInputModule, MatTableModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';


describe('OdontologosListComponent', () => {
  let component: OdontologosListComponent;
  let fixture: ComponentFixture<OdontologosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontologosListComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,  AngularFireAuthModule, RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule, MatPaginatorModule, MatIconModule, MatInputModule, HttpClientModule,
        MatTableModule, AngularFireStorageModule, MatDialogModule, ToastrModule.forRoot(),
        ],
        
        providers: [{ provide: MatPaginator, AngularFirestore}, ToastrService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontologosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
