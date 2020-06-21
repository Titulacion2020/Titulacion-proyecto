import { TestBed } from '@angular/core/testing';

import { FcmService } from './fcm.service';
import {  AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('FcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AngularFirestoreModule, AngularFireStorageModule, HttpClientModule, ToastrModule.forRoot(),],
    providers: [{ provide: AngularFirestore,  useValue: {}}, ToastrService]
  }));

  it('should be created', () => {
    const service: FcmService = TestBed.get(FcmService);
    expect(service).toBeTruthy();
  });
});
