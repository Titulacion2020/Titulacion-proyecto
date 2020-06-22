import { SolicitudInterface } from 'src/app/interfaces/solicitud-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private SolicitudCollection: AngularFirestoreCollection<SolicitudInterface>;
  private SolicitudDoc: AngularFirestoreDocument<SolicitudInterface>;
  private Solicitud: Observable<SolicitudInterface[]>;
  public solicitudSelected: SolicitudInterface = {};
  constructor(
    private readonly afs: AngularFirestore
  ) {
    this.SolicitudCollection = afs.collection<SolicitudInterface>('SolicitudesQNS',  ref => ref.orderBy('fechaSolicitud', 'desc'));
    this.Solicitud = this.SolicitudCollection.valueChanges();
  }

  addSolicitud(solicitud: SolicitudInterface) {
    return this.SolicitudCollection.add(solicitud);
  }

  updateSolicitud(solicitud: SolicitudInterface) {
    return this.SolicitudCollection.doc(solicitud.id).update(solicitud);
  }

  getSolicitudByCedulaP(cedula: string) {
    this.SolicitudCollection = this.afs.collection(
      'SolicitudesQNS', ref => ref.where('cedulaSolicitante', '==', cedula).orderBy('fechaSolicitud', 'desc'));
    return this.Solicitud = this.SolicitudCollection.snapshotChanges()
    .pipe(map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SolicitudInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }
    ));
  }

  deleteSolicitud(solicitud: SolicitudInterface) {
    return this.SolicitudCollection.doc(solicitud.id).delete();
  }
}
