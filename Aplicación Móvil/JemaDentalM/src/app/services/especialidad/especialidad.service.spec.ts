import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TestBed } from '@angular/core/testing';

import { EspecialidadService } from './especialidad.service';

describe('EspecialidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: EspecialidadService = TestBed.get(EspecialidadService);
    expect(service).toBeTruthy();
  });
});
