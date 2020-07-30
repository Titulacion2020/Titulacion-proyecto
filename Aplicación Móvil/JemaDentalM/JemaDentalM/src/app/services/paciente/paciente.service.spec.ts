import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TestBed } from '@angular/core/testing';

import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: PacienteService = TestBed.get(PacienteService);
    expect(service).toBeTruthy();
  });
});
