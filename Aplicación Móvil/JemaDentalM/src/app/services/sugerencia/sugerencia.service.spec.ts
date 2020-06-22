import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TestBed } from '@angular/core/testing';

import { SugerenciaService } from './sugerencia.service';

describe('SugerenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: SugerenciaService = TestBed.get(SugerenciaService);
    expect(service).toBeTruthy();
  });
});
