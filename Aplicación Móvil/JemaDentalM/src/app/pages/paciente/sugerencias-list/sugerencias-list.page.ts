import { SugerenciaService } from './../../../services/sugerencia/sugerencia.service';
import { SugerenciaInterface } from './../../../interfaces/sugerencia-model';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugerencias-list',
  templateUrl: './sugerencias-list.page.html',
  styleUrls: ['./sugerencias-list.page.scss'],
})
export class SugerenciasListPage implements OnInit {

  sugerencias: SugerenciaInterface[];
  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public sugerenciaService: SugerenciaService
  ) { }

  ngOnInit() {
    this.getUserAuth();
  }

  async getUserAuth() {
    await this.authService.isAuth().subscribe(auth => {
       if (auth) {
         this.pacientService.getOnePaciente(auth.email).subscribe(user => {
           user.map(usu => {
            this.sugerenciaService.getSugerenciasByCedulaP(usu.cedula).subscribe(suge => {
              this.sugerencias = suge;
            });
           });
         });
       }
     });
   }

}
