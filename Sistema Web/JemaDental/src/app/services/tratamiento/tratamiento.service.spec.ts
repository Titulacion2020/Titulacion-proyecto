import { TestBed } from '@angular/core/testing';

import { TratamientoService } from './tratamiento.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

describe('TratamientoService', () => {
  let service: TratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, AngularFireStorageModule,
        AngularFireAuthModule, HttpClientModule],
    });
    //service = TestBed.inject(TratamientoService);
  });

  it('should be created', () => {
    const service: TratamientoService = TestBed.get(TratamientoService);
    expect(service).toBeTruthy();
  });
});
