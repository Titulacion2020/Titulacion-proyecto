import { CitaMInterface } from './../../../interfaces/cita-model';
import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { Router } from '@angular/router';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { CitaService } from './../../../services/cita/cita.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';

@Component({
  selector: 'app-citas-o',
  templateUrl: './citas-o.page.html',
  styleUrls: ['./citas-o.page.scss'],
})
export class CitasOPage implements OnInit {
  citas: CitaMInterface[];
  existCita: boolean;
  public userOdontologo: OdontologoInterface = {};
  fecha = new Date();
  fechaAct: number;
  newArrayP = {
    cedulaPaciente: '',
  };

  arrayPacientes = [];
  constructor(
    public citaMService: CitaService,
    public pacientService: PacienteService,
    public authService: AuthService,
    public router: Router,
    public odontService: OdontologoService,
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
    await this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.odontService.getOneOdontologobyE(auth.email).subscribe(user => {
          user.map(res => {
            this.userOdontologo = res;
            this.citaMService.getCitasByCedulaO(this.userOdontologo.cedula, this.fechaAct).subscribe(cita => {
              this.citas = cita;
              if (Object.keys(cita).length === 0) {
                this.existCita = false;
              } else {
                this.existCita = true;
              }
            });
          });
        });
      }
    });
  }

}
