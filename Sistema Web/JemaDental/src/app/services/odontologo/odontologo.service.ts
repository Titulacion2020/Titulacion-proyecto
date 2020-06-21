import { map, finalize } from 'rxjs/operators';
import { OdontologoInterface } from './../../models/odontologo-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {

  private OdontCollection: AngularFirestoreCollection<OdontologoInterface>;
  private OdontDoc: AngularFirestoreDocument<OdontologoInterface>;
  private Odontologo: Observable<OdontologoInterface[]>;

  private filePath: any;
  private downloadURL: Observable<string>;
  // tslint:disable-next-line: max-line-length
  defaultImg: any = 'https://firebasestorage.googleapis.com/v0/b/jema-dental.appspot.com/o/imageOdontProfile%2Fuserphoto.png?alt=media&token=79e54081-7486-41ec-b380-e3ff34def585';


  public odontologoSelected: OdontologoInterface;
  public odontologoSelectedBorrar: OdontologoInterface;

  arrayOdontologos = [];

  constructor(
    private afs: AngularFirestore,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.OdontCollection = afs.collection<OdontologoInterface>('Odontologos', ref => ref.orderBy('nombre', 'asc'));
    this.Odontologo = this.OdontCollection.valueChanges();
    this.Odontologo.subscribe(list => {
      this.arrayOdontologos = list.map(item => {
        return {
          id: item.id,
          nombre: item.nombre,
          cedula: item.cedula,
          email: item.email,
          especialidad: item.especialidad,
          horas: item.horario
        };
      });
    });
  }

  getAllOdontologos() {
    return this.Odontologo = this.OdontCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as OdontologoInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  public addNewOdontologo(odontologo: OdontologoInterface) {
    this.OdontCollection = this.afs.collection<OdontologoInterface>('Odontologos');
    return this.OdontCollection.doc(odontologo.id).set(odontologo);
  }

  public editOdontologo(odontologo: OdontologoInterface) {
    return this.OdontCollection.doc(odontologo.id).update(odontologo);
  }

  deleteOdontologo(odontologo: OdontologoInterface) {
    return this.OdontCollection.doc(odontologo.id).delete();
  }

  getUser_Odontologo(ci: string) {
    this.OdontCollection = this.db.collection<OdontologoInterface>('Odontologos', ref =>
      ref.where('cedula', '==', ci)
    );

    const paciente = this.OdontCollection.snapshotChanges().pipe(
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
