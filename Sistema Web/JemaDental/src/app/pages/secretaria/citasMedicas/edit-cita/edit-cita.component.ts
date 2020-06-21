import { FcmService } from 'src/app/services/fcm/fcm.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { CitaService } from './../../../../services/cita/cita.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { CitaMInterface } from './../../../../models/cita-model';
import { PacienteInterface } from './../../../../models/paciente-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrls: ['./edit-cita.component.css']
})
export class EditCitaComponent implements OnInit {

  actualizo: boolean;
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));

  CitaMform: FormGroup;
  especialidadSelect: any[];
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
  citasFiltradas: CitaMInterface[];

  dataPaciente: PacienteInterface;
  // Lista de pacientes
  pacientList: any[] = [];
  // Lista odontologos
  dentistList: any[] = [];

  constructor(
    private toastr: ToastrService,
    public espeService: EspecialidadService,
    public pactService: PacienteService,
    private dateAdapter: DateAdapter<Date>,
    private citaMService: CitaService,
    public odontService: OdontologoService,
    private dialogRef: MatDialogRef<EditCitaComponent>,
    @Inject(LOCALE_ID) private locale: string,
    private fcmService: FcmService
  ) {
    this.dateAdapter.setLocale('es');
    dialogRef.disableClose = true;
  }

  ngOnInit() {

    this.CitaMform = new FormGroup({
      id: new FormControl(null),
      seguro: new FormControl(''),
      namepaciente: new FormControl(''),
      especialidad: new FormControl('', Validators.required),
      cipaciente: new FormControl('', Validators.required),
      odontologo: new FormControl('', Validators.required),
      telfPaciente: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    });

    this.especialidadSelect = this.getEspecialidades();
    this.getPacientandDentistList();
    this.actualizo = false;
  }

  getEspecialidades(): any[] {
    let especiadidadesArray = [];
    this.odontService.arrayOdontologos.map((odont) => {

      if (especiadidadesArray.length == 0) {
        especiadidadesArray.push(odont.especialidad);
      } else if (!especiadidadesArray.find(val => val.trim() === odont.especialidad.trim())) {
        especiadidadesArray.push(odont.especialidad);
      }
    });
    return especiadidadesArray;
  }

  displayFn(subject) {
    return subject ? subject.cedula : undefined;
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
    this.pactService.getUser_Token(this.citaMService.selectCitaM.cipaciente).subscribe(data => {
      for (let paciente of data) {
        this.dataPaciente = paciente;
  }

  });
    this.CitaMform.get('id').patchValue(this.citaMService.selectCitaM.id);
    this.CitaMform.get('cipaciente').patchValue(this.citaMService.selectCitaM.cipaciente);
    this.CitaMform.get('namepaciente').patchValue(this.citaMService.selectCitaM.namepaciente);
    this.CitaMform.get('telfPaciente').patchValue(this.citaMService.selectCitaM.telfPaciente);
    const parts = this.citaMService.selectCitaM.fecha.split('/');
    const newdate = new Date(parts[2], (parts[1] - 1), parts[0]);
    this.CitaMform.get('fecha').patchValue(newdate);
    this.CitaMform.get('seguro').patchValue(this.citaMService.selectCitaM.seguro);
    this.CitaMform.get('especialidad').patchValue(this.citaMService.selectCitaM.especialidad.trim());
    const dentistSelected = this.odontEspecialidad.find(search => search.cedula === this.citaMService.selectCitaM.odontologo);
    this.CitaMform.get('odontologo').patchValue(dentistSelected);
    this.CitaMform.get('hora').patchValue(this.citaMService.selectCitaM.hora);
    this.CitaMform.get('estado').patchValue(this.citaMService.selectCitaM.estado);
  }


  especialidad(val: any) {
    if (this.actualizo === false) {
      this.odontEspecialidad = [];
      this.horariobyOdontologoList = [];
      this.cleanHourValue();
      this.specialtiesSelected = val;
      this.odontService.arrayOdontologos.map((odont) => {
        if (odont.especialidad === val.trim()) {
          this.odontEspecialidad.push(odont);
        }
      });
    }
  }

  filterhoursbyOdonto(dentistselected: any) {
    if (this.actualizo === false) {
      if (dentistselected) {
        const iddentist = dentistselected.cedula;
        this.dentistselected = dentistselected;
        this.horariobyOdontologoList = [];
        this.cleanHourValue();
        if (this.dateSelected && this.specialtiesSelected) {
          const arrayFiltered = this.registeredMedicalAppointments.filter(
            appointmentsFiltered => appointmentsFiltered.odontologo === iddentist
              && this.dateSelected.getTime() === appointmentsFiltered.fecha
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
          this.horariobyOdontologoList = JSON.parse(JSON.stringify(hoursbydentist));
          if (this.horariobyOdontologoList.length > 0 && arrayFiltered.length > 0) {
            this.horariobyOdontologoList = JSON.parse(JSON.stringify(this.removeRegisteredHours(arrayFiltered,
              this.horariobyOdontologoList, this.citaMService.selectCitaM.hora)));
          }
        }
        if (this.dateSelected && this.specialtiesSelected && this.dentistselected) {
          if (!this.hourSelected) {
            if (this.horariobyOdontologoList.length === 0) {
              this.toastr.info('Citas no disponibles', 'MENSAJE');
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
      this.dateSelected = new Date(date);
      const getdentisValue = this.CitaMform.get('odontologo').value;
      if (getdentisValue) {
        this.filterhoursbyOdonto(getdentisValue);
      }
    }
    this.citasFiltradas = this.citaMService.citaArray;
  }

  validarCitaMedicaRegistrada(event) {

    const cedula = this.CitaMform.get('cipaciente').value;
    const fecha = this.CitaMform.get('fecha').value;
    const fechaT = Date.parse(fecha);
    const hora = this.CitaMform.get('hora').value;


    if (hora !== this.citaMService.selectCitaM.hora) {
      const valores = this.citasFiltradas.find(
        datosCitas => datosCitas.cipaciente === cedula && datosCitas.fecha === fechaT && datosCitas.hora === hora);

      if (valores !== undefined) {
        this.CitaMform.get('hora').setErrors({ repeatHora: true })
        this.toastr.warning('El paciente ya tiene una cita médica registrada a esa hora', 'MENSAJE');
      }
    }
  }



  guardarCitaMedica(data: CitaMInterface) {
    const fecha = Date.parse(data.fecha);
    data.fecha = fecha;
    let newdata: CitaMInterface;
    newdata = data;
    newdata.odontologo = newdata.odontologo.cedula;
    newdata.nameodontologo = this.dentistselected.nombre;

    if (newdata.estado === 'agendada' || newdata.estado === 'confirmada') {
      if (this.dataPaciente && this.dataPaciente.token) {
        const msg = 'Su cita fué ' + newdata.estado + ' exitosamente.';
        this.fcmService.sendPostRequest(msg, this.dataPaciente.token);
      }
    }

    this.citaMService.updateCitaM(newdata);
    this.actualizo = true;
    this.toastr.success('Registro actualizado exitosamente', 'MENSAJE');
    this.close();

  }


  close(): void {
    this.dialogRef.close();
  }

  check(event: KeyboardEvent) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/;
    if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }

  getErrorMessageP() {
    return this.CitaMform.get('cipaciente').hasError('required') ? 'Seleccione el paciente' : '';
  }

  getErrorMessageE() {
    return this.CitaMform.get('especialidad').hasError('required') ? 'Seleccione la especialidad' : '';
  }

  getErrorMessageF() {
    return this.CitaMform.get('fecha').hasError('required') ? 'Fecha incorrecta' : '';
  }

  getErrorMessageO() {
    return this.CitaMform.get('odontologo').hasError('required') ? 'Seleccione el odontologo' : '';
  }

  getErrorMessageH() {
    return this.CitaMform.get('hora').hasError('required') ? 'Seleccione la hora de la cita' :
      this.CitaMform.get('hora').hasError('repeatHora') ? 'El paciente ya tiene una cita a esa hora' :
        '';
  }
  getErrorMessageEst() {
    return this.CitaMform.get('estado').hasError('required') ? 'Seleccione el estado de la cita' : '';
  }
}
