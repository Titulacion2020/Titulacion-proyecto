import { map } from 'rxjs/operators';
import { PacienteInterface } from './../../interfaces/paciente-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private PacientCollection: AngularFirestoreCollection<PacienteInterface>;
  private pacientDoc: AngularFirestoreDocument<PacienteInterface>;
  private Paciente: Observable<PacienteInterface[]>;

  public pacienteSelected: PacienteInterface = {};
  arrayPacientes = [];

  constructor(
    private readonly afs: AngularFirestore,
    private db: AngularFirestore
  ) {
    this.PacientCollection = afs.collection<PacienteInterface>('Pacientes', ref => ref.orderBy('hClinica', 'asc'));
    this.Paciente = this.PacientCollection.valueChanges();
    this.Paciente.subscribe(list => {
      this.arrayPacientes = list.map(item => {
        return {
          id: item.id,
          cedula: item.cedula,
          nombre: item.nombre,
          seguro: item.seguro,
          hClinica: item.hClinica,
          email: item.email,
          foto: item.foto,
          rol: item.rol,
          telefono: item.telefono,
          token: item.token ? item.token : ''
        };
      });
    });
  }

  getAllPacientes() {
    return this.Paciente = this.PacientCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PacienteInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addPaciente(paciente: PacienteInterface) {
    this.PacientCollection = this.db.collection<PacienteInterface>('Pacientes');
    return this.PacientCollection.doc(paciente.id).set(paciente);
    // return this.PacientCollection.add(paciente);
  }

  getOnePaciente(email: string) {
    this.PacientCollection = this.afs.collection<PacienteInterface>(
      'Pacientes', ref => ref.where('email', '==', email));
    return this.Paciente = this.PacientCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PacienteInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
  getOnePacientebyC(cedula: string) {
    this.PacientCollection = this.afs.collection<PacienteInterface>(
      'Pacientes', ref => ref.where('cedula', '==', cedula));
    return this.Paciente = this.PacientCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PacienteInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  editProfile(paciente: PacienteInterface) {
    this.PacientCollection.doc(paciente.id).update(paciente);
  }


  // =================================================================

  guardarToken(id: string, token: any) {
    this.PacientCollection = this.db.collection<PacienteInterface>('Pacientes');
    return this.PacientCollection.doc(id).update({
      token: token
    });
  }

  getPaciente_sugerencia(ci: string) {
    this.PacientCollection = this.db.collection<PacienteInterface>('Pacientes', ref =>
      ref.where('cedula', '==', ci)
    );
    const paciente = this.PacientCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return paciente;
  }
}
