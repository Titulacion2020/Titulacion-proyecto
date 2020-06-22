import { environment } from './../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';

import { TratamientoService } from './tratamiento.service';
import { AngularFireModule } from '@angular/fire';

describe('TratamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: TratamientoService = TestBed.get(TratamientoService);
    expect(service).toBeTruthy();
  });
});
