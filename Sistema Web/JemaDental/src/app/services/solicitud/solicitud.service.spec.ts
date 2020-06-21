import { TestBed } from '@angular/core/testing';

import { SolicitudService } from './solicitud.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


describe('SolicitudService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, AngularFireStorageModule,
      AngularFireAuthModule, HttpClientModule],
  }));

  it('should be created', () => {
    const service: SolicitudService = TestBed.get(SolicitudService);
    expect(service).toBeTruthy();
  });
});
