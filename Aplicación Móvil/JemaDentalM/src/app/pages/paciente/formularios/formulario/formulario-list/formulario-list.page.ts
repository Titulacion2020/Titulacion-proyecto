import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SolicitudService } from '../../../../../services/solicitud/solicitud.service';
import { PacienteService } from '../../../../../services/paciente/paciente.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { SolicitudInterface } from 'src/app/interfaces/solicitud-model';

@Component({
  selector: 'app-formulario-list',
  templateUrl: './formulario-list.page.html',
  styleUrls: ['./formulario-list.page.scss'],
})
export class FormularioListPage implements OnInit {

  solicitudes: SolicitudInterface[];
  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public solicitudService: SolicitudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserAuth();
  }

  async getUserAuth() {
    await this.authService.isAuth().subscribe(auth => {
       if (auth) {
         this.pacientService.getOnePaciente(auth.email).subscribe(user => {
           user.map(usu => {
            this.solicitudService.getSolicitudByCedulaP(usu.cedula).subscribe(soli => {
              this.solicitudes = soli;
            });
           });
         });
       }
     });
   }

  openSolicitud(element) {
    this.viewSolicitud(element);
  }

  onEdit(element) {
    this.solicitudService.solicitudSelected = Object.assign({}, element);
    this.router.navigate(['/menuP/p/editFormulario']);
  }

  async onDelete(element) {
    const alert = await this.alertController.create({
      header: 'MENSAJE',
      message: '¿Estas seguro de eliminar el formulario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           // console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.solicitudService.deleteSolicitud(element);
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Formulario eliminado exitosamente',
      duration: 2000,
      color: 'success',
      header: '',
      position: 'top'
    });
    toast.present();
  }

  async viewSolicitud(element) {
    const sol = Object.assign({}, element);
    const alert = await this.alertController.create({
      header: 'Solicitud',
      message: '<b>Tipo de Formulario: </b>' + sol.tipoSolicitud + '<br>' +
      '<b>Estado: </b>' + sol.estadoSolicitud  + '<br>' +
      '<b>Descripción: </b>' + sol.descripcion + '<br>' +
      '<b>Respuesta: </b>' + sol.respuesta  + '<br>',
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
