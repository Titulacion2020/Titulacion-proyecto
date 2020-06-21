import { TestBed } from '@angular/core/testing';

import { OdontologoService } from './odontologo.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


describe('OdontologoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, AngularFireStorageModule,
      AngularFireAuthModule, HttpClientModule],
  }));

  it('should be created', () => {
    const service: OdontologoService = TestBed.get(OdontologoService);
    expect(service).toBeTruthy();
  });
});
