import { SolicitudService } from './../../../../services/solicitud/solicitud.service';
import { SolicitudInterface } from 'src/app/interfaces/solicitud-model';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-formulario',
  templateUrl: './edit-formulario.page.html',
  styleUrls: ['./edit-formulario.page.scss'],
})
export class EditFormularioPage implements OnInit {

  tipo: string;
  comentario: string;
  tipoFormulario: string[] = ['Queja', 'Novedad', 'Sugerencia'];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private solicitudService: SolicitudService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tipo = this.solicitudService.solicitudSelected.tipoSolicitud;
    this.comentario = this.solicitudService.solicitudSelected.descripcion;
  }

  onSave() {
    if (this.tipo === undefined) {
      this.presentToast('Seleccione el tipo de formulario');
      return;
    }

    if (this.comentario === undefined || this.comentario.trim().length === 0) {
      this.presentToast('Escriba un comentario');
      return;
    }
    this.solicitudService.solicitudSelected.tipoSolicitud = this.tipo;
    this.solicitudService.solicitudSelected.descripcion = this.comentario;
    this.solicitudService.updateSolicitud(this.solicitudService.solicitudSelected);
    this.alertSolicitud();
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


  async alertSolicitud() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Formulario editado exitosamente',
      backdropDismiss: false,
      buttons: [
         {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menuP/p/solicitudes']);
          }
        }
      ]
    });

    await alert.present();
  }

}
