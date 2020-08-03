import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TestBed } from '@angular/core/testing';

import { OdontologoService } from './odontologo.service';

describe('OdontologoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: OdontologoService = TestBed.get(OdontologoService);
    expect(service).toBeTruthy();
  });
});
