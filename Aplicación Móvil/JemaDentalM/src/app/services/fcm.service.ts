import { OdontologoService } from './odontologo/odontologo.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FCM } from '@ionic-native/fcm/ngx';
import { PacienteService } from './paciente/paciente.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private http: HttpClient,
    private fcm: FCM,
    private pacienteService: PacienteService,
    private odontService: OdontologoService
  ) { }

  async generateToken(id_user: string) {
    this.fcm.getToken().then(async token => {
    //  console.log('Token:', token);
      const fcmToken = token;

      await this.pacienteService.guardarToken(id_user, fcmToken).then(() => {
      //  console.log('Token saved success...');
      }).catch(res => console.log('Error save Token...', res));

    }).catch(error => console.log('Error get Token FCM:', error));
  }

  async generateTokenO(id_user: string) {
    this.fcm.getToken().then(async token => {
     // console.log('Token:', token);
      const fcmToken = token;

      await this.odontService.guardarToken(id_user, fcmToken).then(() => {
        // console.log('Token saved success...');
      }).catch(res => console.log('Error save Token...', res));

    }).catch(error => console.log('Error get Token FCM:', error));
  }

  // =========================================================================================
  // Enviar POST al servidor - Message
  // =========================================================================================


  sendPostRequest_notificacion(msg: string, token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyBvJrDyKfObBzuCyNICWbzOUfg_-sMOFZ0'
      })
    };

    const postData = {
      notification: {
        title: 'JemaDental',
        body: msg,
        sound: 'default',
      },
      to: token,
      priority: 'high',
      notification_priority: 'PRIORITY_HIGH'
    };

    this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions).subscribe(data => {
     // console.log(data['_body']);
    }, error => {
    // console.log(error);
    });
  }
}
