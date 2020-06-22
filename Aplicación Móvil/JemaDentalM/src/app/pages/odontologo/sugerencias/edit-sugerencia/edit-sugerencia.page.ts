import { Router } from '@angular/router';
import { SugerenciaInterface } from './../../../../interfaces/sugerencia-model';
import { AlertController, ToastController } from '@ionic/angular';
import { SugerenciaService } from './../../../../services/sugerencia/sugerencia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-sugerencia',
  templateUrl: './edit-sugerencia.page.html',
  styleUrls: ['./edit-sugerencia.page.scss'],
})
export class EditSugerenciaPage implements OnInit {

  nombrePaciente: string;
  sugerenciaText: string;
  public sugerencia: SugerenciaInterface = {};

  constructor(
    private sugerenciaService: SugerenciaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.nombrePaciente = this.sugerenciaService.sugerenciaSelected.nombrePaciente;
    this.sugerenciaText = this.sugerenciaService.sugerenciaSelected.sugerencia;

  }
  saveSugerencia() {
    if (this.sugerenciaText === undefined) {
      this.presentToast('Escriba la sugerencia');
      return;
    }
    if (this.sugerenciaText.trim().length === 0) {
      this.presentToast('Escriba la sugerencia');
      return;
    }
    this.sugerenciaService.sugerenciaSelected.sugerencia = this.sugerenciaText;
    this.sugerenciaService.sugerenciaSelected.fechaSugerencia = Date.parse(Date());
    this.sugerenciaService.updateSugerencia(this.sugerenciaService.sugerenciaSelected);
    this.alertSugerencia();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      header: '',
      position: 'bottom'
    });
    toast.present();
  }
  async alertSugerencia() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Sugerencia actualizada exitosamente.',
      backdropDismiss: false,
      buttons: [
         {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menuO/o/sugerencias']);
          }
        }
      ]
    });
    await alert.present();
  }

}
