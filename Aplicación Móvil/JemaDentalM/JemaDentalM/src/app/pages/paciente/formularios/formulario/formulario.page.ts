import { FcmService } from 'src/app/services/fcm.service';
import { Router } from '@angular/router';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { PacienteInterface } from 'src/app/interfaces/paciente-model';
import { SolicitudInterface } from 'src/app/interfaces/solicitud-model';
import { SolicitudService } from './../../../../services/solicitud/solicitud.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  tipo: string;
  comentario: string;
  public solicitud: SolicitudInterface = {};
  public userPaciente: PacienteInterface = {};
  estado = 'Pendiente';
  tipoFormulario: string[] = ['Queja', 'Novedad', 'Sugerencia'];
  minDate: Date = new Date();


  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public solicitudService: SolicitudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private userService: AuthService,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    this.getUserAuth();
  }
  async getUserAuth() {
    await this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.pacientService.getOnePaciente(auth.email).subscribe(user => {
          user.map(usu => {
            this.userPaciente = usu;
          });
        });
      }
    });
  }

  saveFormulario() {

    if (this.tipo === undefined) {
      this.presentToast('Seleccione el tipo de formulario');
      return;
    }

    if (this.comentario === undefined) {
      this.presentToast('Escriba un comentario');
      return;
    }
    if (this.comentario.trim().length === 0) {
      this.presentToast('Escriba un comentario');
      return;
    }

    this.solicitud = {
      id: null,
      nombreSolicitante: this.userPaciente.nombre,
      cedulaSolicitante: this.userPaciente.cedula,
      emailSolicitante: this.userPaciente.email,
      fechaSolicitud: Date.parse(Date()),
      tipoSolicitud: this.tipo,
      descripcion: this.comentario,
      estadoSolicitud: this.estado,
      respuesta: ''
    };
    this.solicitudService.addSolicitud(this.solicitud);
    this.alertSolicitud();

        // Notification - Secretaria
    const userSub = this.authService.getAllUsuarios().subscribe(data => {
      for (const usuario of data) {
        if (usuario.token && usuario.roles.secretaria) {
        //  console.log(usuario.token);
          const msg = 'Tiene una nueva solicitud';
          this.fcmService.sendPostRequest_notificacion(msg, usuario.token);
        }
      }
      userSub.unsubscribe();
    });
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
      message: 'Solicitud enviada exitosamente. Gracias por ayudarnos a mejorar.',
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
