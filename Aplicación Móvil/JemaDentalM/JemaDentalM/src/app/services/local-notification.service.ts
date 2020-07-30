import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    private localNotifications: LocalNotifications
  ) { }



  requestPermission() {
    this.localNotifications.hasPermission().then(granted => {

      if (granted) {
        // alert('Ok has:' + granted = true);
        // console.log('Has Premission successful...!!')
      } else {
        // alert('Not has:' + granted = false);
        this.localNotifications.requestPermission().then(granted => {
          // alert('Ok request');
          // console.log('Request Premission successful...')
        }).catch(error => console.log('Error Request Premission:', error));
      }

    }).catch(error => console.log('Error Has Premission:', error));

  }

  delayedNotification() {
    // Schedule delayed notification
    this.localNotifications.schedule({
      title: 'APP Test',
      text: 'Notificacion programada',
      icon: 'assets/icon/simple-logo.png',
      trigger: { at: new Date(new Date().getTime() + 320) },
      led: { color: '#FF00FF', on: 500, off: 500 },
      // sound: null
      vibrate: true
    });
  }

  delayedNotification_cita(date: number, time: string) {
    // Schedule delayed notification
    this.localNotifications.schedule({
      id: Math.floor((Math.random() * 100) + 1),
      title: 'JemaDental',
      text: 'Recuerde su cita hoy a las ' + time,
      icon: 'assets/icon/simple-logo.png',
      trigger: { at: new Date(date + ((3600 * 7) * 1000)) }, // Fecha seleccionada a la 7:00 am
      led: { color: '#FF00FF', on: 500, off: 500 },
      // sound: null
      vibrate: true,
    });
  }

  singleNotification(title: string, text: string) {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: Math.floor((Math.random() * 100) + 1),
      title: title,
      icon: 'assets/icon/simple-logo.png',
      text: text,
      vibrate: true
      // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      // data: { secret: key }
    });
  }

  clearAllNotification() {
    this.localNotifications.clearAll();
  }






}
