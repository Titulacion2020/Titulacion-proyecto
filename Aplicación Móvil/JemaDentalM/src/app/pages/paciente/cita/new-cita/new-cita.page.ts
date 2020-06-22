import { FcmService } from 'src/app/services/fcm.service';
import { Router } from '@angular/router';
import { CitaService } from './../../../../services/cita/cita.service';
import { ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaMInterface } from './../../../../interfaces/cita-model';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteInterface } from './../../../../interfaces/paciente-model';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LocalNotificationService } from 'src/app/services/local-notification.service';

@Component({
  selector: 'app-new-cita',
  templateUrl: './new-cita.page.html',
  styleUrls: ['./new-cita.page.scss'],
})
export class NewCitaPage implements OnInit {

  public userPaciente: PacienteInterface = {};

  odontEspecialidad: any[];
  dentistselected: any;
  dateSelected: Date;
  specialtiesSelected: string;
  registeredMedicalAppointments: CitaMInterface[] = [];
  horariobyOdontologoList: string[] = [];
  minDate: Date = new Date();
  citasFiltradas: CitaMInterface[];
  agendado = false;

  CitaMform = new FormGroup({
    id: new FormControl(null),
    seguro: new FormControl(''),
    namepaciente: new FormControl(''),
    especialidad: new FormControl(''),
    cipaciente: new FormControl(''),
    odontologo: new FormControl(''),
    hora: new FormControl(''),
    fecha: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public odontService: OdontologoService,
    public toastController: ToastController,
    public citaMService: CitaService,
    public router: Router,
    public alertController: AlertController,
    private localNotificationService: LocalNotificationService,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    this.getRegisteredMedicalAppointments();
    this.getUserAuth();
    this.getOdontologosG();
  }

  getRegisteredMedicalAppointments() {
    this.citaMService.getAllCitasMedicas().subscribe(rest => {
      this.registeredMedicalAppointments = rest;
    }, error => {
      throw error;
    });
  }

  async getUserAuth() {
    await this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.pacientService.getOnePaciente(auth.email).subscribe(user => {
          user.map(res => {
            this.userPaciente = res;
          });
        });
      }
    });
  }

  getOdontologosG() {
    this.odontEspecialidad = [];
    this.specialtiesSelected = 'odontologia general';
    this.odontService.arrayOdontologos.map((odont) => {
      if (odont.especialidad === 'odontologia general') {
        this.odontEspecialidad.push(odont);
      }
    });
  }

  filterhoursbyOdonto(dentistselected: any) {
    if (dentistselected) {
      const iddentist = dentistselected.cedula;
      this.dentistselected = dentistselected;
      if (this.dateSelected && this.specialtiesSelected) {
        const arrayFiltered = this.registeredMedicalAppointments.filter(
          appointmentsFiltered => appointmentsFiltered.odontologo === iddentist
            && Date.parse(this.dateSelected.toString()) === appointmentsFiltered.fecha
            && this.specialtiesSelected === appointmentsFiltered.especialidad);
        const hoursbydentist: string[] = [];
        this.odontService.arrayOdontologos.forEach(dentisSelec => {
          if (dentisSelec.cedula === iddentist) {
            dentisSelec.horas.forEach(schedule => {
              if (this.convertNumbertoDay(this.dateSelected.getDay()) === schedule.dia) {
                schedule.horas.forEach(hours => {
                  hoursbydentist.push(hours);
                });
              }
            });
          }
        });
        this.horariobyOdontologoList = JSON.parse(JSON.stringify(hoursbydentist));
        if (this.horariobyOdontologoList.length > 0 && arrayFiltered.length > 0) {
          this.horariobyOdontologoList = JSON.parse(JSON.stringify(
            this.removeRegisteredHours(arrayFiltered, this.horariobyOdontologoList)));
        }
      }
      if (this.dateSelected && this.specialtiesSelected && this.dentistselected) {
        if (this.horariobyOdontologoList.length === 0) {
          this.alertCita('Citas no disponibles en la fecha seleccionada');
        }
      }
    }
  }
  convertNumbertoDay(dayNumber: number): string {
    let dayname: string;
    const daysList = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    if (dayNumber === 1) {
      dayname = daysList[0];
    }
    if (dayNumber === 2) {
      dayname = daysList[1];
    }
    if (dayNumber === 3) {
      dayname = daysList[2];
    }
    if (dayNumber === 4) {
      dayname = daysList[3];
    }
    if (dayNumber === 5) {
      dayname = daysList[4];
    }
    if (dayNumber === 6) {
      dayname = daysList[5];
    }
    if (dayNumber === 0) {
      dayname = daysList[6];
    }
    return dayname;
  }

  removeRegisteredHours(arrayFilteredCita: any, horarioDentista: any[]): string[] {
    // List de horas reservadas
    const hoursReserved: string[] = [];
    arrayFilteredCita.forEach(reserved => {
      hoursReserved.push(reserved.hora);
    });
    const hourwithoutRegister: string[] = [];
    horarioDentista.forEach(hours => {
      const existHourinReservedList = hoursReserved.find(search => search === hours);
      if (!existHourinReservedList) {
        hourwithoutRegister.push(hours);
      }
    });
    return hourwithoutRegister;
  }

  selectFecha(date: any) {
    const fecha = new Date(date);
    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);

    this.dateSelected = fecha;

    const getdentisValue = this.CitaMform.get('odontologo').value;
    if (getdentisValue) {
      this.filterhoursbyOdonto(getdentisValue);
    }
  }

  validarCitaMedicaRegistrada(event) {
    this.citasFiltradas = this.citaMService.citaArray;
    const ci = this.pacientService.pacienteSelected.cedula;
    const fechaT = new Date(this.CitaMform.get('fecha').value);
    fechaT.setHours(0);
    fechaT.setMinutes(0);
    fechaT.setSeconds(0);
    const fechaTR = Date.parse(fechaT.toString());
    const valores = this.citasFiltradas.find(
      datosCitas => datosCitas.cipaciente === ci && datosCitas.fecha === fechaTR && datosCitas.hora === event);
    if (valores !== undefined) {
      this.agendado = true;
      this.alertCita('Ya tiene una cita agendada en la misma fecha y hora');
    } else {
      this.agendado = false;
    }
  }

  guardarCitaMedica(data: CitaMInterface) {

    if (this.CitaMform.get('odontologo').value === '' || this.CitaMform.get('odontologo').value === undefined) {
      this.presentToastError('Seleccione el odontólogo');
      return;
    }
    if (this.CitaMform.get('fecha').value === '' || this.CitaMform.get('fecha').value === undefined) {
      this.presentToastError('Seleccione la fecha de la cita médica');
      return;
    }
    if (this.CitaMform.get('hora').value === '' || this.CitaMform.get('hora').value === undefined) {
      this.presentToastError('Seleccione la hora de la cita médica');
      return;
    }
    const date = new Date(data.fecha);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    data.fecha = Date.parse(date.toString());
    data.cipaciente = this.userPaciente.cedula;
    data.especialidad = this.specialtiesSelected;
    data.estado = 'pendiente';
    data.seguro = this.userPaciente.seguro;
    data.namepaciente = this.userPaciente.nombre;
    data.telfPaciente = this.userPaciente.telefono;
    // objeto modificado
    let newdata: CitaMInterface;
    newdata = data;

    if (newdata.cipaciente) {
      newdata.odontologo = newdata.odontologo.cedula;
      newdata.nameodontologo = this.dentistselected.nombre;
      this.localNotificationService.delayedNotification_cita(newdata.fecha, newdata.hora);
      this.citaMService.addCitaM(newdata);
      const userSub = this.authService.getAllUsuarios().subscribe(data => {
        for (const usuario of data) {
          if (usuario.token && usuario.roles.secretaria) {
            const msg = 'Tiene una nueva cita médica registrada';
            this.fcmService.sendPostRequest_notificacion(msg, usuario.token);
          }
        }
        userSub.unsubscribe();
      });
      this.alertCitaSave();
    }
  }

  async presentToastError(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      header: 'MENSAJE',
      position: 'bottom'
    });
    toast.present();
  }

  async alertCitaSave() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Cita médica registrada exitosamente',
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menuP/p/citas']);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertCita(msg) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: msg,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
/*             this.CitaMform.get('hora').disabled;
 */          }
        }
      ]
    });

    await alert.present();
  }
}
