import { CitaMInterface } from './../../../../interfaces/cita-model';
import { PacienteInterface } from './../../../../interfaces/paciente-model';
import { Observable } from 'rxjs';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { CitaService } from './../../../../services/cita/cita.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.page.html',
  styleUrls: ['./edit-cita.page.scss'],
})
export class EditCitaPage implements OnInit {

  actualizo: boolean;
  CitaMform = new FormGroup({
    id: new FormControl(null),
    seguro: new FormControl(''),
    namepaciente: new FormControl(''),
    especialidad: new FormControl(''),
    cipaciente: new FormControl(''),
    odontologo: new FormControl('',  Validators.required),
    hora: new FormControl('',  Validators.required),
    fecha: new FormControl('',  Validators.required),
    estado: new FormControl(''),
  });

  filteredOptions: Observable<string[]>;
  minDate: Date = new Date();
  specialtiesSelected: string;
  pacientes: PacienteInterface[];
  pacient: PacienteInterface = {};
  odontEspecialidad: any[] = [];
  horariobyOdontologoList: string[] = [];
  hourSelected: string;
  allHours = [];
  dateSelected: Date;
  dentistselected: any;
  registeredMedicalAppointments: CitaMInterface[] = [];

  // Lista de pacientes
  pacientList: any[] = [];
  // Lista odontologos
  dentistList: any[] = [];

  constructor(
    public pactService: PacienteService,
    private citaMService: CitaService,
    public odontService: OdontologoService,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router
  ) {

  }

  ngOnInit() {
  /*   this.getPacientandDentistList();
    this.actualizo = false;
    this.getOdontologosG(); */
  }
  ionViewWillEnter() {
    this.getPacientandDentistList();
    this.actualizo = false;
    this.getOdontologosG();
  }

  getPacientandDentistList() {
    this.pactService.getAllPacientes().subscribe(restPacient => {
      this.pacientList = restPacient;
      this.odontService.getAllOdontologos().subscribe(restDentist => {
        this.dentistList = restDentist;
        this.citaMService.getAllCitasMedicas().subscribe(restAppointment => {
          this.registeredMedicalAppointments = restAppointment;
          this.setDataCitaM();
        });
      });
    });
  }

  setDataCitaM() {
    const pacientfiltered = this.pacientList.find(search => search.cedula === this.citaMService.selectCitaM.cipaciente);
    this.CitaMform.get('id').setValue(this.citaMService.selectCitaM.id);
    this.CitaMform.get('cipaciente').setValue(pacientfiltered);
    this.CitaMform.get('namepaciente').setValue(this.citaMService.selectCitaM.namepaciente);
    const parts = this.citaMService.selectCitaM.fecha.split('/');
    const newdate = parts[1] + '/' + parts[0] + '/' + parts[2];
    this.CitaMform.get('fecha').setValue(newdate);
    this.CitaMform.get('seguro').setValue(this.citaMService.selectCitaM.seguro);
    this.CitaMform.get('especialidad').setValue(this.citaMService.selectCitaM.especialidad);
    const dentistSelected = this.odontEspecialidad.find(search => search.cedula === this.citaMService.selectCitaM.odontologo);
    this.CitaMform.get('odontologo').setValue(dentistSelected);
    this.CitaMform.get('hora').setValue(this.citaMService.selectCitaM.hora);
    this.CitaMform.get('estado').setValue(this.citaMService.selectCitaM.estado);
  }

  async getOdontologosG() {
    if (this.actualizo === false) {
      this.odontEspecialidad = [];
      this.specialtiesSelected = 'odontologia general';
      await this.odontService.arrayOdontologos.map((odont) => {
        if (odont.especialidad === 'odontologia general') {
          this.odontEspecialidad.push(odont);
        }
      });
    }
  }

  filterhoursbyOdonto(dentistselected: any) {
    if (this.actualizo === false) {
      if (dentistselected) {
        const iddentist = dentistselected.cedula;
        this.dentistselected =  dentistselected;
        this.horariobyOdontologoList = [];
        this.cleanHourValue();
        if (this.dateSelected && this.specialtiesSelected) {
          const arrayFiltered = this.registeredMedicalAppointments.filter(
            appointmentsFiltered => appointmentsFiltered.odontologo === iddentist
            && Date.parse(this.dateSelected.toString()) === appointmentsFiltered.fecha
            && this.specialtiesSelected === appointmentsFiltered.especialidad
          );
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
          this.horariobyOdontologoList = JSON.parse( JSON.stringify(hoursbydentist));
          if (this.horariobyOdontologoList.length > 0 && arrayFiltered.length > 0) {
            this.horariobyOdontologoList = JSON.parse( JSON.stringify( this.removeRegisteredHours(arrayFiltered,
              this.horariobyOdontologoList, this.citaMService.selectCitaM.hora)));
          }
        }
        if (this.dateSelected && this.specialtiesSelected && this.dentistselected ) {
          if (!this.hourSelected) {
            if (this.horariobyOdontologoList.length === 0) {
              this.alertFechaND();
            }
          }
        }
      }
    }
  }

  changeHour(hour) {
    if (this.actualizo === false) {
      this.hourSelected = hour;
    }
  }

  removeRegisteredHours(arrayFilteredCita: any, horarioDentista: any[], horaEdit: string): string[] {
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
    if (horaEdit) {
      hourwithoutRegister.push(horaEdit);
    }
    return hourwithoutRegister;
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

  cleanHourValue() {
    if (this.horariobyOdontologoList.length === 0) {
      this.hourSelected = undefined;
    }
  }

  selectFecha(date: any) {
    if (this.actualizo === false) {
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
  }

  guardarCitaMedica(data: CitaMInterface) {
    if (this.CitaMform.get('odontologo').value === '' || this.CitaMform.get('odontologo').value === undefined) {
      this.presentToastError('Seleccione el odontólogo');
      return;
    }
    if (this.CitaMform.get('fecha').value === '' || this.CitaMform.get('fecha').value === undefined ) {
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
    let newdata: CitaMInterface;
    newdata = data;
    if (newdata.cipaciente ) {
        newdata.cipaciente =  newdata.cipaciente.cedula;
        newdata.odontologo =  newdata.odontologo.cedula;
        newdata.nameodontologo = this.dentistselected.nombre;
        this.citaMService.updateCitaM(newdata);
        this.actualizo = true;
        this.alertCitaEdit();
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

  async alertCitaEdit() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Cita médica actualizada exitosamente',
      backdropDismiss: false,
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

  async alertFechaND() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Citas no disponibles en la fecha seleccionada',
      buttons: [
         {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.CitaMform.get('hora').reset();
          }
        }
      ]
    });

    await alert.present();
  }

}
