import { TestBed } from '@angular/core/testing';

import { CitaService } from './cita.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('CitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, AngularFireStorageModule,
      AngularFireAuthModule],
  }));

  it('should be created', () => {
    const service: CitaService = TestBed.get(CitaService);
    expect(service).toBeTruthy();
  });
});
