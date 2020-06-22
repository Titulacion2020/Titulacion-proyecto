import { map } from 'rxjs/operators';
import { OdontologoInterface } from './../../interfaces/odontologo-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {

  private OdontCollection: AngularFirestoreCollection<OdontologoInterface>;
  private OdontDoc: AngularFirestoreDocument<OdontologoInterface>;
  private Odontologo: Observable<OdontologoInterface[]>;

  public odontologoSelected: OdontologoInterface = {};

  arrayOdontologos = [];

  constructor(
    private readonly afs: AngularFirestore,

  ) {
    this.OdontCollection = afs.collection<OdontologoInterface>('Odontologos',  ref => ref.orderBy('nombre', 'asc'));
    this.Odontologo = this.OdontCollection.valueChanges();
    this.Odontologo.subscribe(list => {
      this.arrayOdontologos = list.map(item => {
        return {
          id: item.id,
          nombre: item.nombre,
          cedula: item.cedula,
          email: item.email,
          especialidad: item.especialidad,
          horas: item.horario,
          jornadaLaboral: item.jornadaLaboral,
          rol: item.rol,
          telefono: item.telefono,
          foto: item.foto,
          token: item.token ? item.token : ''
        };
      });
    });
  }

  getAllOdontologos() {
    return this.Odontologo = this.OdontCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as OdontologoInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneOdontologobyE(email: string) {
    this.OdontCollection = this.afs.collection<OdontologoInterface>(
      'Odontologos', ref => ref.where('email', '==', email));
    this.Odontologo = this.OdontCollection.snapshotChanges().pipe(map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as OdontologoInterface;
            const id = a.payload.doc.id;
            return {id, ...data };
          });
        }
      ));
    return this.Odontologo;
  }

  getOdontologobyC( cedulaOdontologo: string) {
    this.OdontCollection = this.afs.collection<OdontologoInterface>(
      'Odontologos', ref => ref.where('cedula', '==', cedulaOdontologo));
    this.Odontologo = this.OdontCollection.snapshotChanges().pipe(map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data };
          });
        }
      ));
    return this.Odontologo;
  }

  editProfile(odontologo: OdontologoInterface) {
    this.OdontCollection.doc(odontologo.id).update(odontologo);
  }

  guardarToken(id: string, token: any) {
    this.OdontCollection = this.afs.collection<OdontologoInterface>('Odontologos');
    return this.OdontCollection.doc(id).update({
      token: token
    });
  }
}
