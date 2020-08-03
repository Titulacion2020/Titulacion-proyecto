import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SugerenciaInterface } from './../../interfaces/sugerencia-model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  private SugerenciaCollection: AngularFirestoreCollection<SugerenciaInterface>;
  private Sugerencia: Observable<SugerenciaInterface[]>;
  public sugerenciaSelected: SugerenciaInterface = {};

  constructor(
    private readonly afs: AngularFirestore
  ) {
    this.SugerenciaCollection = afs.collection<SugerenciaInterface>('Sugerencias',  ref => ref.orderBy('fechaSolicitud', 'desc'));
    this.Sugerencia = this.SugerenciaCollection.valueChanges();
  }

  getSugerenciasByCedulaP(cedula: string) {
    this.SugerenciaCollection = this.afs.collection(
      'Sugerencias', ref => ref.where('cedulaPaciente', '==', cedula).orderBy('fechaSugerencia', 'desc'));
    return this.Sugerencia = this.SugerenciaCollection.snapshotChanges()
    .pipe(map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SugerenciaInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
  }

  getSugerenciasByCedulaO(cedula: string) {
    this.SugerenciaCollection = this.afs.collection(
      'Sugerencias', ref => ref.where('cedulaOdont', '==', cedula).orderBy('fechaSugerencia', 'desc'));
    return this.Sugerencia = this.SugerenciaCollection.snapshotChanges()
    .pipe(map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SugerenciaInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
  }

  addSugerencia(sugerencia: SugerenciaInterface) {
    return this.SugerenciaCollection.add(sugerencia);
  }

  updateSugerencia(sugerencia: SugerenciaInterface) {
    return this.SugerenciaCollection.doc(sugerencia.id).update(sugerencia);
  }

  deleteSugerenciaM(sugerencia: SugerenciaInterface) {
    return this.SugerenciaCollection.doc(sugerencia.id).delete();
  }
}
