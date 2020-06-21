import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private messaging = firebase.messaging();
  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();


  constructor(
    private toastr: ToastrService,
    private firestore: AngularFirestore,
    private http: HttpClient) { }


  // get permission to send messages
  async getPermission(id: string) {

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    this.messaging.requestPermission().then(() => {
      return this.messaging.getToken();
    }).then(token => {
      this.updateUser_token(id, token);
      const notification = new Notification('Bienvenido a la Plataforma JemaDental');
    }).catch((err) => {
    });

  }

  // Listen for token refresh
  refreshToken(id: string) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken().then(refreshedToken => {
        this.updateUser_token(id, refreshedToken);
        // this.saveToken(user, refreshedToken)
      }).catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }

  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
      this.toastr.info(payload.notification.body,payload.notification.title);
      this.messageSource.next(payload);
    });
  }

  // Actulidar token de usuario logueado
  updateUser_token(id: string, token: any) {
    const user = this.firestore.collection<any>('Users');
    return user.doc(id).update({
      token: token
    });
  }

  // SEND - NOTIFICATION
  sendPostRequest(msg: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'key=AIzaSyBvJrDyKfObBzuCyNICWbzOUfg_-sMOFZ0'
      })
    };
    const postData = {
      notification: {
        title: 'JemaDental',
        body: msg
      },
      to: token
    };


    this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions).subscribe(
      data => {
      },
      error => {
      }
    );
  }


  sendNotificacion(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'key=AIzaSyBvJrDyKfObBzuCyNICWbzOUfg_-sMOFZ0'
      })
    };
    const postData = {
      notification: {
        title: 'JemaDental',
        body: 'Nueva asignación'
      },
      to: token
    };

    this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions).subscribe(
      data => {
      },
      error => {;
      }
    );
  }

}
