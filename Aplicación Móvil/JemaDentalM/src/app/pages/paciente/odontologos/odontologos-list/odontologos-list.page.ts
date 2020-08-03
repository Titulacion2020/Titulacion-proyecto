import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { Component, OnInit } from '@angular/core';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';

@Component({
  selector: 'app-odontologos-list',
  templateUrl: './odontologos-list.page.html',
  styleUrls: ['./odontologos-list.page.scss'],
})
export class OdontologosListPage implements OnInit {

  odontologos: OdontologoInterface[];
  odontEspecialidad: any[] = [];
  espeSelected: string;

  constructor(
    private odontService: OdontologoService,
    public especialidadService: EspecialidadService
  ) { }

  ngOnInit() {}

  especialidad() {
    this.odontEspecialidad = [];
    this.odontService.arrayOdontologos.map((odont) => {
      if (odont.especialidad === this.espeSelected) {
        this.odontEspecialidad.push(odont);
      }
    });
  }

}
