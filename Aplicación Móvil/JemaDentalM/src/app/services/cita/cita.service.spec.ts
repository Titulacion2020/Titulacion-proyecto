import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TestBed } from '@angular/core/testing';

import { CitaService } from './cita.service';

describe('CitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: CitaService = TestBed.get(CitaService);
    expect(service).toBeTruthy();
  });
});
