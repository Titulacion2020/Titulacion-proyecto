import { SugerenciaService } from './../../../../services/sugerencia/sugerencia.service';
import { SugerenciaInterface } from './../../../../interfaces/sugerencia-model';
import { Subscription, empty } from 'rxjs';
import { PacienteInterface } from 'src/app/interfaces/paciente-model';
import { TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth/auth.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { CitaService } from './../../../../services/cita/cita.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { Component, OnInit } from '@angular/core';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';
import { FcmService } from 'src/app/services/fcm.service';

@Component({
  selector: 'app-new-sugerencia',
  templateUrl: './new-sugerencia.page.html',
  styleUrls: ['./new-sugerencia.page.scss'],
})
export class NewSugerenciaPage implements OnInit {

  public userOdontologo: OdontologoInterface = {};
  public pacientes: PacienteInterface[];
  public sugerencia: SugerenciaInterface = {};
  sugerenciaText: string;
  arrayPacientes = [];
  pacientesList = [];
  subscribe: Subscription;
  pacienteSel: PacienteInterface = {};
  fecha = new Date();
  fechaAct: number;
  constructor(
    public citaMService: CitaService,
    public pacientService: PacienteService,
    public authService: AuthService,
    public router: Router,
    public odontService: OdontologoService,
    public modalController: ModalController,
    public tratamientoService: TratamientoService,
    private toastController: ToastController,
    private sugerenciaService: SugerenciaService,
    private alertController: AlertController,
    private pacienteService: PacienteService,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    this.getPacientesByDay();
    const date = new Date(this.fecha);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    this.fechaAct = Date.parse(date.toString());
  }

  async getPacientesByDay() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.odontService.getOneOdontologobyE(auth.email).subscribe(user => {
          user.map(res => {
            this.userOdontologo = res;
            this.subscribe = this.citaMService.getCitasByCedulaO(this.userOdontologo.cedula, this.fechaAct)
              .subscribe(cita => {
                if (Object.keys(cita).length === 0) {
                  // Null
                } else {
                  const pacientes = {};
                  const unicosReg = cita.filter(e => {
                    return pacientes[e.cipaciente] ? false : (pacientes[e.cipaciente] = true);
                  });
                  unicosReg.map(cedulas => {
                    this.arrayPacientes.push(cedulas.cipaciente);
                  });
                  this.arrayPacientes.map(paciente => {
                    const pacientFilteredC = this.pacientService.arrayPacientes.find(
                      pacientFilterbycedula => pacientFilterbycedula.cedula === paciente);
                    this.pacientesList.push(pacientFilteredC);
                  });
                  this.pacientes = this.pacientesList;
                  this.subscribe.unsubscribe();
                }
              });
          });
        });
      }
    });
  }

  saveSugerencia() {
    if (this.pacienteSel === undefined) {
      this.presentToast('Por favor seleccione el paciente');
      return;
    }
    if (Object.keys(this.pacienteSel).length === 0 ) {
      this.presentToast('Por favor seleccione el paciente');
      return;
    }
    if (this.sugerenciaText === undefined) {
      this.presentToast('Escriba la sugerencia');
      return;
    }
    if (this.sugerenciaText.trim().length === 0) {
      this.presentToast('Escriba la sugerencia');
      return;
    }

    // Notification - Patient Suggestion
    const paciente_sub = this.pacienteService.getPaciente_sugerencia(this.pacienteSel.cedula).subscribe(data => {
      for (const paciente of data) {
        if (paciente.token) {
          const msg = 'Tiene una nueva sugerencia médica';
          this.fcmService.sendPostRequest_notificacion(msg, paciente.token);
        }
      }
      paciente_sub.unsubscribe();
    });


    this.sugerencia = {
      id: null,
      cedulaPaciente: this.pacienteSel.cedula,
      cedulaOdont: this.userOdontologo.cedula,
      sugerencia: this.sugerenciaText,
      fechaSugerencia: Date.parse(Date()),
      nombreOdont: this.userOdontologo.nombre,
      nombrePaciente: this.pacienteSel.nombre
    };

    this.sugerenciaService.addSugerencia(this.sugerencia);
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
      message: 'Sugerencia enviada exitosamente.',
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
