import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TratamientoMInterface } from './../../interfaces/tratamiento-model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  TratamientoMCollection: AngularFirestoreCollection<TratamientoMInterface>;
  Tratamiento: Observable<TratamientoMInterface[]>;

  public selectTratamientoM: TratamientoMInterface = {};

  TratamientosArray = [];

   constructor(
    private afs: AngularFirestore
  ) {
    this.TratamientoMCollection = afs.collection<TratamientoMInterface>('Tratamiento',  ref => ref.orderBy('fecha', 'desc'));
    this.Tratamiento = this.TratamientoMCollection.valueChanges();
  }

  getTratamientosByPacientes(cedula: string) {
    this.TratamientoMCollection = this.afs.collection<TratamientoMInterface>(
      'Tratamiento',  ref => ref.where('cipaciente', '==', cedula).orderBy('fecha', 'desc'));
    return this.Tratamiento = this.TratamientoMCollection.snapshotChanges()
      .pipe(map( changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as TratamientoMInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
}
