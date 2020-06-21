import { TestBed } from '@angular/core/testing';

import { EspecialidadService } from './especialidad.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


describe('EspecialidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, AngularFireStorageModule,
      AngularFireAuthModule, HttpClientModule],
  }));

  it('should be created', () => {
    const service: EspecialidadService = TestBed.get(EspecialidadService);
    expect(service).toBeTruthy();
  });
});
