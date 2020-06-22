import { UserInterface } from './../../interfaces/user-model';
import { OdontologoInterface } from './../../interfaces/odontologo-model';
import { PacienteInterface } from './../../interfaces/paciente-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UserCollection: AngularFirestoreCollection<UserInterface>;
  private User: Observable<UserInterface[]>;
  arrayUsuarios = [];

  constructor(
    private AFauth: AngularFireAuth,
    private af: AngularFirestore
  ) {
    this.UserCollection = af.collection<UserInterface>('Users', ref => ref.orderBy('nombre', 'asc'));
    this.User = this.UserCollection.valueChanges();
    this.User.subscribe(list => {
      this.arrayUsuarios = list.map(item => {
        return {
          id: item.id,
          nombre: item.nombre,
          cedula: item.cedula,
          email: item.email
        };
      });
    });
  }

  getAllUsuarios() {
    return this.User = this.UserCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData);
        }).catch(err => reject(err));
    });
  }

  async registroUsuario(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData);
          this.AFauth.auth.signOut();
        }).catch(err => reject(err));
    });
  }

  isAuth() {
    return this.AFauth.authState.pipe(map(auth => auth));
  }

  reAuth(email: string, password: string) {
    return this.AFauth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
  }

  updateLoginEmail(newEmail: string) {
    return this.AFauth.auth.currentUser.updateEmail(newEmail);
  }

  sendEmailtoResetPass(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.sendPasswordResetEmail(email)
        .then(userData => {
          resolve(userData);
        }).catch(err => reject(err));
    });
  }

  updatePassword(newPassword: string) {
    return this.AFauth.auth.currentUser.updatePassword(newPassword);
  }

}
