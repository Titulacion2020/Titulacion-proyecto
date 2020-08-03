import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.page.html',
  styleUrls: ['./rest-password.page.scss'],
})
export class RestPasswordPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  email = '';

  resetPassForm = new FormGroup({
    email: new FormControl('', Validators.pattern(this.emailPattern)),
  });

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  sendEmail() {
    this.email = this.resetPassForm.get('email').value;
    if (this.email.trim().length === 0) {
      this.presentToastE('Ingrese el correo electrónico');
      return;
    }
    if (this.resetPassForm.get('email').hasError('pattern')) {
      this.presentToastE('El correo electrónico es incorrecto');
      return;
    }
    this.authService.sendEmailtoResetPass(this.email)
      .then((res) => {
        this.alertSendEmail();
      }).catch((err) => {
        this.presentToastE('El correo electrónico no pertenece a una cuenta');
      });
  }

  async alertSendEmail() {
    const alert = await this.alertController.create({
      header: 'Mensaje enviado exitosamente',
      message: 'Revisa la bandeja de entrada o correo spam',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/inicio']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastE(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      header: 'MENSAJE',
      position: 'bottom'
    });
    toast.present();
  }


}
