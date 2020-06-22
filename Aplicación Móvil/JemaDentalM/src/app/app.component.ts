import { LocalNotificationService } from './services/local-notification.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import {
  Platform, ToastController, AlertController, PopoverController,
  ModalController, IonRouterOutlet
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // Set up Hardware Back Button Event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    public fcm: FCM,
    private alertController: AlertController,
    private localNotifService: LocalNotificationService,
    private localNotif: LocalNotifications

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonEvent();
      this.getNotifications();
    });
  }

  private getNotifications() {
  //  this.fcm.clearAllNotifications();
    this.fcm.onNotification().subscribe(data => {
      // this.fcm.clearAllNotifications();
      if (data.wasTapped) {

      } else {
        this.localNotifService.singleNotification(data.title, data.body);
      }
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

      // Close popover

      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // Close modal

      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
      //    console.log('Ingresa Router Oulets');
          return;
        }

        if (this.router.url === '/inicio') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // Work in ionic 4
          } else {
            console.log('Toast');
            this.toastAlert();
            this.lastTimeBackPress = new Date().getTime();
          }
        }

      });
    });
  }

  async toastAlert() {
    const toast = await this.toastCtrl.create({
      message: 'Presione dos veces para salir a segundo plano',
      position: 'top',
      color: 'light',
      duration: 2000
    });
    await toast.present();
  }

  async alertNotification(data) {
    const alert = await this.alertController.create({
      header: 'NOTIFICACIÓN',
      message: data,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


}
