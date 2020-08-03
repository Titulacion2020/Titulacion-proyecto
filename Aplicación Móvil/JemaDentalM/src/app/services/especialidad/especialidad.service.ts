import { EspecialidadInterface } from './../../interfaces/especialidad-model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private EspCollection: AngularFirestoreCollection<EspecialidadInterface>;
  private Especialidad: Observable <EspecialidadInterface[]>;

  public espeSelected: EspecialidadInterface = {};

  arrayEspe = [];

  constructor(
    private readonly afs: AngularFirestore
  ) {
    this.EspCollection = afs.collection<EspecialidadInterface>('Especialidades',  ref => ref.orderBy('nombre', 'asc'));
    this.Especialidad = this.EspCollection.valueChanges();
    this.Especialidad.subscribe(list => {
      this.arrayEspe = list.map(item => {
        return {
          id: item.id,
          nombre: item.nombre
        };
      });
    });
  }
}
