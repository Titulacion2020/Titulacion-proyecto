import { map } from 'rxjs/operators';
import { CitaMInterface } from './../../interfaces/cita-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private CitaMCollection: AngularFirestoreCollection<CitaMInterface>;
  private CitaMtDoc: AngularFirestoreDocument<CitaMInterface>;
  private CitasMedicas: Observable<CitaMInterface[]>;
  private citaM: Observable<CitaMInterface>;

  public selectCitaM: CitaMInterface = {};

  citaArray = [];
  constructor(
    private readonly afs: AngularFirestore
  ) {
    this.CitaMCollection = afs.collection<CitaMInterface>('CitasMedicas',  ref => ref.orderBy('fecha', 'asc'));
    this.CitasMedicas = this.CitaMCollection.valueChanges();
    this.CitasMedicas.subscribe(list => {
      this.citaArray = list.map(item => {
        return {
          id: item.id,
          especialidad: item.especialidad,
          hora: item.hora,
          fecha: item.fecha,
          cipaciente: item.cipaciente,
          namepaciente: item.namepaciente,
          odontologo: item.odontologo,
          seguro: item.seguro,
          estado: item.estado
        };
      });
    });
  }

  getAllCitasMedicas() {
    this.CitaMCollection = this.afs.collection<CitaMInterface>('CitasMedicas',  ref => ref.orderBy('fecha', 'asc'));
    this.CitasMedicas = this.CitaMCollection.valueChanges();
    return this.CitasMedicas = this.CitaMCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CitaMInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getCitasByCedulaP(cedula: string) {
    this.CitaMCollection = this.afs.collection(
      'CitasMedicas', ref => ref.where('cipaciente', '==', cedula).orderBy('fecha', 'desc'));
    return this.CitasMedicas = this.CitaMCollection.snapshotChanges()
    .pipe(map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as CitaMInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
  }
  getCitasByCedulaO(cedula: string, fecha: number) {
    this.CitaMCollection = this.afs.collection(
      'CitasMedicas', ref => ref.where('odontologo', '==', cedula).where('fecha', '==', fecha).where('estado', '==', 'confirmada'));
    return this.CitasMedicas = this.CitaMCollection.snapshotChanges()
    .pipe(map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as CitaMInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
  }

  deleteCitaM(cita: CitaMInterface) {
    return this.CitaMCollection.doc(cita.id).delete();
  }

  addCitaM(cita: CitaMInterface) {
    cita.id = this.afs.createId();
    return this.CitaMCollection.doc(cita.id).set(cita);
  }

  updateCitaM(cita: CitaMInterface) {
    return this.CitaMCollection.doc(cita.id).update(cita);
  }

  formtDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
