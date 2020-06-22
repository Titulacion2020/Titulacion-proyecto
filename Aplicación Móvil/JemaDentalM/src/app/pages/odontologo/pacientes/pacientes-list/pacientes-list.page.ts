import { TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { TratamientosPage } from './../tratamientos/tratamientos.page';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth/auth.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { CitaService } from './../../../../services/cita/cita.service';
import { Component, OnInit } from '@angular/core';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';
import { PacienteInterface } from 'src/app/interfaces/paciente-model';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.page.html',
  styleUrls: ['./pacientes-list.page.scss'],
})
export class PacientesListPage implements OnInit {

  public userOdontologo: OdontologoInterface = {};
  public pacientes: PacienteInterface[];
  fecha = new Date();
  fechaAct: number;
  arrayCedulaP = {
    cedulaPaciente: '',
  };
  existPacientes: boolean;
  arrayPacientes = [];
  pacientesList = [];
  subscribe: Subscription;
  constructor(
    public citaMService: CitaService,
    public pacientService: PacienteService,
    public authService: AuthService,
    public router: Router,
    public odontService: OdontologoService,
    public modalController: ModalController,
    public tratamientoService: TratamientoService
  ) { }

  ngOnInit() {
    this.getUserAuth();
    const date = new Date(this.fecha);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    this.fechaAct = Date.parse(date.toString());
  }

  async getUserAuth() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.odontService.getOneOdontologobyE(auth.email).subscribe(user => {
          user.map(res => {
            this.userOdontologo = res;
            this.subscribe = this.citaMService.getCitasByCedulaO(this.userOdontologo.cedula, this.fechaAct).subscribe(cita => {
              if (Object.keys(cita).length === 0) {
                this.existPacientes = false;
              } else {
                this.existPacientes = true;
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

  async openTratamiento(paciente) {
    const modal = await this.modalController.create({
      cssClass: 'primary',
      component: TratamientosPage,
      backdropDismiss: false,
      componentProps: {
        cedPaciente: paciente.cedula,
      },
    });
    return await modal.present();
  }

}
