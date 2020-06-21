import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { NewOdontologoComponent } from './../new-odontologo/new-odontologo.component';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EditOdontologoComponent } from '../edit-odontologo/edit-odontologo.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OdontologoInterface } from 'src/app/models/odontologo-model';
import { CitaMInterface } from './../../../../models/cita-model';
import { CitaService } from './../../../../services/cita/cita.service';
import { AprobarEliminarOdontologoComponent } from '../aprobar-eliminar/aprobar-eliminar.component';

@Component({
  selector: 'app-odontologos-list',
  templateUrl: './odontologos-list.component.html',
  styleUrls: ['./odontologos-list.component.css']
})
export class OdontologosListComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'foto', 'nombre', 'cedula', 'especialidad',
    'email', 'telefono', 'diasLaborales', 'jornadaLaboral', 'accion'];
  dataSource = new MatTableDataSource();
  odontologo: OdontologoInterface;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public router: Router,
    public authService: AuthService,
    private toastr: ToastrService,
    private odontService: OdontologoService,
    private espeService: EspecialidadService,
    private citaMService: CitaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.odontService.getAllOdontologos().subscribe(odontologos => {
      this.dataSource.data = odontologos;
      const tam = Object.keys(this.dataSource.data).length;
      for (let i = 0; i < tam; i++) {
        const element = odontologos[i];
        const dias = new Array();
        const horarios = element.horario;
        const tam1 = Object.keys(horarios).length;
        for (let i = 0; i < tam1; i++) {
          dias.push(horarios[i].dia);
        }
        this.dataSource.data[i]['diasLaborales'] = dias;
      }

    });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element) {
    this.openDialogEdit();
    if (element) {
      this.odontService.odontologoSelected = Object.assign({}, element);
    }
  }


  openDialogNew(): void {
    this.dialog.open(NewOdontologoComponent, {height:'850px',width:'900px'});
  }

  
  openDialogEdit(): void {
    this.dialog.open(EditOdontologoComponent, {height:'850px',width:'900px'});
  }

  onDelete(element) {
    this.openDialogConfirmar();
    if (element) {
      this.odontService.odontologoSelectedBorrar = Object.assign({}, element);
    }
  }

  openDialogConfirmar(): void {
    this.dialog.open(AprobarEliminarOdontologoComponent);
  }

}
