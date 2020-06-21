import { TestBed } from '@angular/core/testing';

import { SeguroService } from './seguro.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

describe('SeguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, AngularFireStorageModule,
      AngularFireAuthModule, HttpClientModule],
  }));

  it('should be created', () => {
    const service: SeguroService = TestBed.get(SeguroService);
    expect(service).toBeTruthy();
  });
});
